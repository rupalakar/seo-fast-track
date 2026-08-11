import type { Lesson, TaskTemplate } from "@/lib/types/content";

export function lessonToPlainText(lesson: Lesson): string {
  const parts: string[] = [lesson.summary];
  lesson.blocks.forEach((block) => {
    switch (block.type) {
      case "paragraph":
      case "heading":
        parts.push(block.text);
        break;
      case "list":
        parts.push(block.items.map((i) => `- ${i}`).join("\n"));
        break;
      case "callout":
        parts.push(block.text);
        break;
      default:
        break;
    }
  });
  return parts.join("\n\n");
}

export function taskToPlainText(task: TaskTemplate): string {
  return [
    `Objektif: ${task.objective}`,
    `Kenapa penting: ${task.why}`,
    `Instruksi:\n${task.instructions.map((s, i) => `${i + 1}. ${s}`).join("\n")}`,
    `Output yang diharapkan: ${task.expectedOutput}`,
  ].join("\n\n");
}
