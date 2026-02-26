/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here
  /**
   *  Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
   */

  function invalidMarks(marks){
    for(let value of Object.values(marks))
      if(typeof value !== 'number' || value<0 || value > 100) 
        return true
    return false
  }


  function grader(percentage){
    if(percentage >= 90) return "A+" 
    if(percentage >= 80) return "A" 
    if(percentage >= 70) return "B" 
    if(percentage >= 60) return "C" 
    if(percentage >= 40) return "D"
    return "F"
  }


  if(!student || 
    !student.name || typeof student.name !== 'string' || !Object.hasOwn(student,'marks') ||
    Object.values(student.marks).length===0 || typeof student.marks !== 'object' ||
    invalidMarks(student.marks)
  ) return null

  let totalMarks=Object.values(student.marks).reduce((acc,curr)=>acc+curr,0);
  let percentage =parseFloat(((totalMarks / (Object.values(student.marks).length * 100)) * 100).toFixed(2))
  let grade=grader(percentage);

  let max=Number.NEGATIVE_INFINITY;
  let min=Number.POSITIVE_INFINITY;

  let maxSub='',minSub='',pass=[],fail=[];

  for(let [key,val] of Object.entries(student.marks)){
    if(val>max){
      maxSub=key
      max=val
    }

    if(val<min){
      minSub=key
      min=min
    }

    if(val>=40) pass.push(key)
    else fail.push(key)
  }

  return {
    name: student.name, totalMarks: totalMarks, percentage: percentage, grade: grade,
    highestSubject: maxSub, lowestSubject: minSub,
    passedSubjects: pass, failedSubjects: fail,
    subjectCount: Object.values(student.marks).length 
  }
}
