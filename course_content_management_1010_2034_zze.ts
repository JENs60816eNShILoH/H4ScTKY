// 代码生成时间: 2025-10-10 20:34:37
 * Features:
 * - Add a new course
 * - Retrieve a course by ID
 * - Update a course
 * - Delete a course
 * - List all courses
 */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// Define the Course model
# 改进用户体验
interface Course {
  id: number;
  title: string;
  description: string;
# 改进用户体验
}

// In-memory storage for courses
# 优化算法效率
const courses: Course[] = [];
let nextId = 1;

// Helper function to generate a unique ID
function generateId(): number {
  return nextId++;
}

// Function to add a new course
async function addCourse(title: string, description: string): Promise<Course> {
  const course: Course = {
    id: generateId(),
    title,
    description,
  };
  courses.push(course);
  return course;
}

// Function to get a course by ID
async function getCourseById(id: number): Promise<Course | undefined> {
  return courses.find((course) => course.id === id);
}

// Function to update a course
async function updateCourse(id: number, title?: string, description?: string): Promise<Course | null> {
  const index = courses.findIndex((course) => course.id === id);
# NOTE: 重要实现细节
  if (index === -1) {
    throw new Error("Course not found");
  }

  courses[index] = {
    ...courses[index],
    title: title ?? courses[index].title,
    description: description ?? courses[index].description,
  };
  return courses[index];
}

// Function to delete a course
# NOTE: 重要实现细节
async function deleteCourse(id: number): Promise<boolean> {
# 添加错误处理
  const index = courses.findIndex((course) => course.id === id);
  if (index === -1) {
    throw new Error("Course not found");
  }

  courses.splice(index, 1);
  return true;
# 扩展功能模块
}

// Function to list all courses
async function listCourses(): Promise<Course[]> {
  return courses;
}

// Example usage
async function main() {
# 改进用户体验
  try {
    console.log("Adding courses...");
    const course1 = await addCourse("Introduction to TypeScript", "Learn TypeScript basics");
    console.log(course1);

    const course2 = await addCourse("Advanced Deno", "Deep dive into Deno");
    console.log(course2);

    console.log("Listing courses...");
    const allCourses = await listCourses();
    console.log(allCourses);

    console.log("Updating course...");
    const updatedCourse = await updateCourse(course1.id, "Advanced TypeScript");
    console.log(updatedCourse);

    console.log("Deleting course...");
    const isDeleted = await deleteCourse(course2.id);
    console.log(isDeleted ? "Course deleted" : "Course not found");
  } catch (error) {
    console.error(error);
  }
}

// Run the main function
# 添加错误处理
main();