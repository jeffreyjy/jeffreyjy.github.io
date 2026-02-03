import { PROJECTS_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

/**
 * Get full path of a project
 * @param id - id of the project (aka slug)
 * @param filePath - the project full file location
 * @param includeBase - whether to include `/projects` in return value
 * @returns project path
 */
export function getProjectPath(
  id: string,
  filePath: string | undefined,
  includeBase = true
) {
  const pathSegments = filePath
    ?.replace(PROJECTS_PATH, "")
    .split("/")
    .filter(path => path !== "") // remove empty string in the segments ["", "other-path"] <- empty string will be removed
    .filter(path => !path.startsWith("_")) // exclude directories start with underscore "_"
    .slice(0, -1) // remove the last segment_ file name_ since it's unnecessary
    .map(segment => slugifyStr(segment)); // slugify each segment path

  const basePath = includeBase ? "/projects" : "";

  // Making sure `id` does not contain the directory
  const projectId = id.split("/");
  const slug = projectId.length > 0 ? projectId.slice(-1) : projectId;

  // If not inside the sub-dir, simply return the file path
  if (!pathSegments || pathSegments.length < 1) {
    return [basePath, slug].join("/");
  }

  return [basePath, ...pathSegments, slug].join("/");
}

