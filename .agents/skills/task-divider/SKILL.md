---
name: task-divider
description: મોટા કામને નાના ભાગોમાં divide કરીને auto-continue execute કરવું
---

# ✂️ Task Divider Skill

## Rules
1. **સ્પષ્ટ કામ** → Plan વગર સીધું execute
2. **મોટું કામ** → Logical parts માં divide
3. **One part at a time** → Part-1 complete + verify → Part-2



## Progress Tracking
```markdown
| Part | Content | Status |
|------|---------|--------|
| 1 | [description] | ✅ Done |
| 2 | [description] | 🔄 In Progress |
| 3 | [description] | ⏳ Pending |
```

## Parallel Execution Within Parts
- Independent files within a part → parallel edit
- Same file within a part → single `multi_replace_file_content`
- Part verify → single build/check step at end
