import type { CollectionEntry } from "astro:content";
import projectFilter from "./projectFilter";

const getSortedProjects = (projects: CollectionEntry<"projects">[]) => {
  return projects
    .filter(projectFilter)
    .sort((a, b) => {
      // Featured projects first
      if (a.data.featured && !b.data.featured) return -1;
      if (!a.data.featured && b.data.featured) return 1;
      // Then sort alphabetically by filename
      const getFileName = (filePath: string | undefined) => {
        if (!filePath) return "";
        const parts = filePath.split("/");
        const fileName = parts[parts.length - 1] || "";
        return fileName.replace(/\.md$/, "").toLowerCase();
      };
      return getFileName(a.filePath).localeCompare(getFileName(b.filePath));
    });
};

export default getSortedProjects;

