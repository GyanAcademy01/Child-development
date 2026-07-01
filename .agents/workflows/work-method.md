---
description: નાના/મોટા tasks માટે work method — compulsory plan, execute, verify, summary
---

# ⚡ Work Method (Compulsory Plan & Approval)

## 🔄 કોઈપણ કાર્ય (Small or Big Work)
- **Process:** Plan → Approval → Execute → Verify → Summary
- **કોઈપણ કાર્ય (નાનું હોય કે મોટું)** શરૂ કરતા પહેલા ફરજિયાત `implementation_plan.md` (task) બનાવવું અને User ની **approval (પરવાનગી)** લેવી.
- ❌ Approval લીધા વગર ક્યારેય execution શરૂ ન કરવું.

### Plan Format:
> [!NOTE]
> ### 🔵 **Plan Summary**
> * **ધ્યેય:** 🎯 [Goal]
> * **ફેરફારો:**
>   - 📂 `file` — [change description]
>   - 📂 `file` — [change description]
> * **સમય:** ⚡ [ઝડપી / મધ્યમ / લાંબો]
>
> *શું હું આ કામ શરૂ કરી શકું? (Yes/No)*

## ⚡ Execution Rules

### Maximum Parallel Work & Subagents (Compulsory)
- હંમેશા maximum subagents (`invoke_subagent`) નો ઉપયોગ કરો અને બધું કામ ફરજિયાત **parallel** ચલાવો. Sequential કામ ટાળો.

### Parallel Operations (Independent tasks = Parallel)
```
✅ [edit file A] + [edit file B] + [search file C]
✅ [grep X] + [grep Y] + [view_file Z]
✅ [write_to_file A] + [write_to_file B]
```

### Sequential Operations (Dependent tasks = Wait)
```
⏳ [edit file] → [build check] → [verify]
⏳ [search] → [edit based on results]
```

### File Edit Rules
| Scenario | Tool | Calls |
|----------|------|-------|
| 1 file, 1 change | `replace_file_content` | 1 |
| 1 file, multi changes | `multi_replace_file_content` | 1 |
| N files, independent | `write_to_file` / `replace_file_content` | N parallel |
| New file | `write_to_file` | 1 |

## 📋 Summary Format
- Task complete → numbered summary (see `task-format` workflow)
- સંપૂર્ણ ગુજરાતીમાં (Gujarati only)
- Short, clear, no long explanation
- 100% accuracy સાથે કાર્ય પૂર્ણ કરવું
- જો કોઈ improve કરવાના suggestions હોય, તો છેલ્લે ઉમેરવા
