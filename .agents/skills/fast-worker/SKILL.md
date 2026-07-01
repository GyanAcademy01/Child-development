---
name: fast-worker
description: ઝડપી + accurate કામ — parallel calls, batch edits, compulsory plan, no wasted steps
---

# ⚡ Fast Worker Skill

## Speed Rules
- **Parallel calls** → independent operations parallel ચલાવો
- **Min reads** → `StartLine/EndLine` use, full file ના વાંચો
- **Batch edits** → same file = `multi_replace_file_content`, different files = parallel `replace_file_content`

## File Operation Rules

| Operation | Tool | Rule |
|-----------|------|------|
| 1 file, 1 change | `replace_file_content` | Single call |
| 1 file, multiple changes | `multi_replace_file_content` | Single call, multiple chunks |
| Multiple files, independent | Parallel `write_to_file` / `replace_file_content` | Parallel calls |
| New file create | `write_to_file` | Single call |
| Search across files | `grep_search` | Parallel with other searches |
| File read | `view_file` | Parallel with other reads |

## Parallel Patterns (Compulsory maximum subagents)

### ✅ GOOD — Parallel
```
[edit file A] + [edit file B] + [search file C]  ← all parallel
[grep_search X] + [grep_search Y] + [view_file Z]  ← all parallel
[write_to_file A] + [write_to_file B]  ← parallel (different files)
```

### ❌ BAD — Sequential (Wasteful)
```
edit A → wait → edit B → wait → search C
search → wait → search → wait → view
```

### ❌ CANNOT Parallel
```
[edit file A] + [edit file A]  ← SAME file conflict!
[run build] + [edit file]  ← build needs latest
```

## Work Method (Compulsory Plan & Approval)
- કોઈપણ કાર્ય માટે ફરજિયાત Plan બનાવવો અને User ની approval લેવી.
```
User Request → Plan → Approval → Execute → Verify → Summary
```
- 100% accuracy જાળવવી.
- Tasks improve કરવા suggestions આપવા.
- હંમેશા સંપૂર્ણ ગુજરાતીમાં વાત કરવી.

## ⛔ NEVER DO
- ❌ Same file 2 વાર parallel edit
- ❌ Same file 2 વાર read (once read, remember)
- ❌ Plan બનાવ્યા વગર સીધું execution શરૂ કરવું
- ❌ Sequential operations for independent tasks
