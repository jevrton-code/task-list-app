export interface ITask {
  id?: number;
  title: string;
  description: string;
  done: boolean;
  tags: string[];
}

// Helper to convert tags array to Postgres array string
export function serializeTags(tags: string[]): string {
  return `{${tags.map((tag) => `"${tag}"`).join(",")}}`;
}

// Helper to parse Postgres array string to tags array
export function parseTags(tags: string): string[] {
  return tags
    .replace(/^{|}$/g, "")
    .split(",")
    .map((tag) => tag.replace(/^"|"$/g, ""))
    .filter((tag) => tag.length > 0);
}
