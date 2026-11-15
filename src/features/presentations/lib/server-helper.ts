/**
 * Derives a title from a given prompt.
 * @param prompt - The input prompt.
 * @returns The derived title.
 */
export function deriveTitle(prompt: string) {
  const line =
    prompt
      .split('\n')
      .map((l) => l.trim())
      .find(Boolean) ?? ''
  const shortened = line.slice(0, 80).trim()
  return shortened || 'Untitled presentation'
}