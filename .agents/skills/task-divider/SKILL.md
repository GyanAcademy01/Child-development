---
name: task-divider
description: મોટા કામને નાના ભાગોમાં divide કરીને auto-continue execute કરવું
---

# ✂️ Task Divider Skill

## Rules
1. **સ્પષ્ટ કામ** → Plan વગર સીધું execute
2. **મોટું કામ** → Logical parts માં divide
3. **One part at a time** → Part-1 complete + verify → Part-2
4. **Token limit** → 50+ items = 30-40 batch
5. **Auto-continue** → parts વચ્ચે user ને ન પૂછો, આપોઆપ continue

## Division Strategy

| Task Size | Division |
|-----------|----------|
| 1-3 files | No division, direct execute |
| 4-10 files | 2 parts |
| 10-30 items | 3 parts |
| 30-50 items | 4-5 parts |
| 50+ items | 30-40 per batch |

## Auto-Continue Protocol
- Part complete → ✅ mark done → next part start
- ❌ "Next part શરૂ કરું?" ન પૂછો
- ❌ Error આવે તો fix first, then continue
- ❌ Unclear requirement → user ને પૂછો

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
