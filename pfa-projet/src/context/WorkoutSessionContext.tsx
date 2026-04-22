import React, { createContext, useContext, useState, useEffect } from 'react';
import type { WorkoutSession, ExerciseInSession, SetLog, WorkoutTemplate } from '../types/fitness';
import { useAuth } from './AuthContext';
import { workoutService } from '../services/workoutService';

interface WorkoutSessionContextType {
  currentWorkout: WorkoutSession | null;
  sessionState: 'idle' | 'active' | 'resting' | 'complete';
  elapsedTime: number;
  currentExerciseIndex: number;
  restTimeRemaining: number;
  startSession: (template: WorkoutTemplate) => void;
  logSet: (exerciseIndex: number, setData: Partial<SetLog>) => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  nextExercise: () => void;
  prevExercise: () => void;
  finishWorkout: () => Promise<void>;
  pauseSession: () => void;
  skipRest: () => void;
}

const WorkoutSessionContext = createContext<WorkoutSessionContextType | undefined>(undefined);

export const WorkoutSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutSession | null>(null);
  const [sessionState, setSessionState] = useState<'idle' | 'active' | 'resting' | 'complete'>('idle');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Timer logic for total elapsed time
  useEffect(() => {
    let interval: any;
    if (sessionState === 'active' && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionState, isPaused]);

  // Rest timer logic
  useEffect(() => {
    let interval: any;
    if (sessionState === 'resting' && restTimeRemaining > 0) {
      interval = setInterval(() => {
        setRestTimeRemaining(prev => {
          if (prev <= 1) {
            setSessionState('active');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionState, restTimeRemaining]);

  const startSession = (template: WorkoutTemplate) => {
    const newSession: WorkoutSession = {
      id: Math.random().toString(36).substr(2, 9),
      templateId: template.id,
      name: template.name.en, // Should ideally handle current language
      startTime: new Date().toISOString(),
      duration: 0,
      exercises: template.exercises.map((ex) => ({
        ...ex,
        sets: [
          { id: '1', weight: 0, reps: 0, isCompleted: false, timestamp: new Date().toISOString() }
        ]
      })),
      totalVolume: 0,
      xpEarned: 0
    };
    setCurrentWorkout(newSession);
    setSessionState('active');
    setElapsedTime(0);
    setCurrentExerciseIndex(0);
  };

  const logSet = (exerciseIndex: number, setData: Partial<SetLog>) => {
    if (!currentWorkout) return;
    const updatedWorkout = { ...currentWorkout };
    const exercise = updatedWorkout.exercises[exerciseIndex];
    
    // Find the set to update or add a new one
    if (setData.id) {
       const setIndex = exercise.sets.findIndex(s => s.id === setData.id);
       if (setIndex !== -1) {
         exercise.sets[setIndex] = { ...exercise.sets[setIndex], ...setData };
       }
    }
    
    setCurrentWorkout(updatedWorkout);
  };

  const completeSet = (exerciseIndex: number, setIndex: number) => {
    if (!currentWorkout) return;
    const updatedWorkout = { ...currentWorkout };
    updatedWorkout.exercises[exerciseIndex].sets[setIndex].isCompleted = true;
    setCurrentWorkout(updatedWorkout);
    
    // Trigger Rest Timer (90s default)
    setRestTimeRemaining(90);
    setSessionState('resting');

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const skipRest = () => {
    setRestTimeRemaining(0);
    setSessionState('active');
  };

  const nextExercise = () => {
    if (currentWorkout && currentExerciseIndex < currentWorkout.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    }
  };

  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(prev => prev - 1);
    }
  };

  const pauseSession = () => setIsPaused(prev => !prev);

  const { user } = useAuth();

  const finishWorkout = async () => {
    if (!currentWorkout || !user) return;
    
    // Calculate total volume
    let volume = 0;
    currentWorkout.exercises.forEach(ex => {
      ex.sets.forEach(set => {
        if (set.isCompleted) {
          volume += (set.weight * set.reps);
        }
      });
    });

    const finishedWorkout: WorkoutSession = {
      ...currentWorkout,
      endTime: new Date().toISOString(),
      duration: elapsedTime,
      totalVolume: volume,
      xpEarned: Math.round(50 + (volume / 100))
    };

    // Save to Supabase
    try {
      await workoutService.saveWorkout({
        userId: user.id,
        name: finishedWorkout.name,
        templateId: finishedWorkout.templateId,
        startTime: finishedWorkout.startTime,
        endTime: finishedWorkout.endTime,
        durationSeconds: finishedWorkout.duration,
        totalVolume: finishedWorkout.totalVolume,
        xpEarned: finishedWorkout.xpEarned,
        exercises: finishedWorkout.exercises.map((ex, exIdx) => ({
          exerciseId: ex.id,
          exerciseName: ex.name.en,
          orderIndex: exIdx,
          sets: ex.sets.map((s, sIdx) => ({
            setNumber: sIdx + 1,
            weightKg: s.weight,
            reps: s.reps,
            isCompleted: s.isCompleted,
            timestamp: s.timestamp
          }))
        }))
      });
    } catch (error) {
      console.error('Failed to save workout:', error);
    }

    setCurrentWorkout(finishedWorkout);
    setSessionState('complete');
  };

  return (
    <WorkoutSessionContext.Provider value={{
      currentWorkout, sessionState, elapsedTime, currentExerciseIndex, restTimeRemaining,
      startSession, logSet, completeSet, nextExercise, prevExercise, finishWorkout, pauseSession, skipRest
    }}>
      {children}
    </WorkoutSessionContext.Provider>
  );
};

export const useWorkoutSession = () => {
  const context = useContext(WorkoutSessionContext);
  if (!context) throw new Error('useWorkoutSession must be used within WorkoutSessionProvider');
  return context;
};
