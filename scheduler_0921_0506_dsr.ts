// 代码生成时间: 2025-09-21 05:06:39
 * It allows users to schedule tasks to run at specified intervals.
# NOTE: 重要实现细节
 */

import { setIntervalAsync, clearIntervalAsync } from 'https://deno.land/x/denodiff/mod.ts';

// Define an interface for the task function
interface TaskFunction {
  (): Promise<void>;
# 添加错误处理
}

// Define an interface for a scheduled task
interface ScheduledTask {
  task: TaskFunction;
  interval: number;
  timerId?: number;
}

class Scheduler {
# TODO: 优化性能
  private tasks: Map<number, ScheduledTask>;
# TODO: 优化性能
  private nextId: number;

  constructor() {
    this.tasks = new Map<>();
    this.nextId = 0;
  }

  // Schedule a new task to run at a given interval
  public scheduleTask(task: TaskFunction, interval: number): number {
    const taskId = this.nextId++;
    const scheduledTask: ScheduledTask = { task, interval };
    this.tasks.set(taskId, scheduledTask);

    // Start the interval for the new task
    const timerId = setIntervalAsync(() => {
      scheduledTask.task();
    }, interval);

    scheduledTask.timerId = timerId;

    return taskId;
  }

  // Remove a scheduled task by its ID
  public removeTask(taskId: number): void {
    const scheduledTask = this.tasks.get(taskId);
    if (!scheduledTask) {
      throw new Error('Task ID not found.');
    }

    clearIntervalAsync(scheduledTask.timerId);
    this.tasks.delete(taskId);
  }

  // Run a scheduled task immediately
  public runTaskNow(taskId: number): void {
    const scheduledTask = this.tasks.get(taskId);
    if (!scheduledTask) {
      throw new Error('Task ID not found.');
    }

    scheduledTask.task();
# NOTE: 重要实现细节
  }
}

// Example usage:

// Define a sample task function that logs a message to the console
const sampleTask: TaskFunction = async (): Promise<void> => {
# 添加错误处理
  console.log('Task executed at', new Date().toISOString());
};

// Create a new scheduler instance
const scheduler = new Scheduler();

// Schedule the sample task to run every 5 seconds
const taskId = scheduler.scheduleTask(sampleTask, 5000);

// After 10 seconds, remove the task
setTimeout(() => {
  scheduler.removeTask(taskId);
  console.log('Task removed');
}, 10000);

// To run the task immediately
scheduler.runTaskNow(taskId);