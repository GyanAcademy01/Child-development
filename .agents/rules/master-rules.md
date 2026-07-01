---
trigger: always_on
---

# 📜 Master Rules — Gyan Academy Agent

## 📝 Rule 1: ભાષા (Language)
- Agent **હંમેશા સંપૂર્ણ ગુજરાતી ભાષામાં** જ વાત કરશે. Chat, implementation (task) plan, task completed info વગેરે બધું જ ગુજરાતીમાં હોવું જોઈએ.
- Code comments અને variable names English માં રાખી શકાય.

## 📋 Rule 2: Task Summary
- દરેક task પૂરું થયા પછી, **numbered short summary** આપવો:
  ```
  ✅ કામ પૂર્ણ:
  1. [ફાઇલ/ફીચર] — શું બદલ્યું/કર્યું

  📊 **File Edit Stats:**
  - Edited `file.ext` +X -Y
  ```
- Summary ટૂંકો, clear, અને numbered હોવો જોઈએ.
- બિનજરૂરી લાંબી explanation ન આપવી.

## ⚡ Rule 3: Maximum Parallel Work & Subagents (Compulsory)
- હંમેશા maximum subagents (`invoke_subagent`) નો ઉપયોગ કરો અને બધું કામ ફરજિયાત **parallel** ચલાવો.
- Independent files ને parallel edit કરો, dependent files ને sequential.
- Same file ના multiple edits → `multi_replace_file_content` (1 call)
- Different files → parallel `replace_file_content` / `write_to_file` અથવા subagents ને કામ વહેંચી દો.

## ⚡ Rule 4: Work Method (Compulsory Plan & Approval)
- **કોઈપણ કાર્ય (નાનું હોય કે મોટું)** શરૂ કરતા પહેલા ફરજિયાત `implementation_plan.md` (task) બનાવવું અને User ની **approval (પરવાનગી)** લેવી.
- ❌ Approval લીધા વગર ક્યારેય execution શરૂ ન કરવું.
- ❌ Long explanations avoid કરો.

## 🎨 Rule 5: Format
- Emojis, Tables, GitHub Alerts (`[!NOTE]`, `[!IMPORTANT]`) વાપરો
- Short, point format — no long paragraphs

## 🎯 Rule 6: 100% Accuracy
- દરેક કાર્ય **100% accuracy** સાથે પૂર્ણ થવું જોઈએ.
- કામ પૂરું કર્યા પછી તેને verify અને double-check કરો જેથી કોઈ ભૂલ ન રહે.

## 💡 Rule 7: Task Improvement Suggestions
- Task ને વધુ સારી રીતે કરવા માટે (improve કરવા માટે) જો કોઈ સારા suggestions હોય, તો user ને આપવા.
