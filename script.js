// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      },
    ],
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
];
  
const getLearnerData = (course, assignmentGroup, learnerSubmissions) => {
        const result = [];
      
        try {
          const courseId = course.id;
          if (courseId !== assignmentGroup.course_id) {
            throw new Error(
              `Course ID mismatch, expected ${courseId}, got ${ag.course_id}`,
            );
          }
      
          const learnerMap = new Map();
          for (const submission of learnerSubmissions) {
            const {
              learner_id,
              assignment_id,
              submission: { submitted_at, score },
            } = submission;
            if (!learnerMap.has(learner_id)) {
              learnerMap.set(learner_id, [[assignment_id, { submitted_at, score }]]);
            } else {
              learnerMap
                .get(learner_id)
                .push([assignment_id, { submitted_at, score }]);
            }
          }
      
          learnerMap.forEach((value, key) => {
            const student = {
              id: key,
              avg: 0,
            };
            let totalScore = 0;
            let totalPossibleScore = 0;
      
            for (const [assignmentIndex, submission] of value) {
              const submittedAtDate = new Date(submission.submitted_at);
              const dueAtDate = new Date(
                assignmentGroup.assignments[assignmentIndex - 1].due_at,
              );
              const currentDate = new Date();
      
              try {
                if (dueAtDate < currentDate) {
                  const assignment = assignmentGroup.assignments[assignmentIndex - 1];
                  const { id: assignmentId, points_possible } = assignment;
                  const submissionScore = submission.score;
      
                  student[assignmentIndex] = submissionScore / points_possible;
      
                  if (assignmentIndex === assignmentId) {
                    if (submittedAtDate > dueAtDate) {
                      student[assignmentIndex] = parseFloat(
                        ((submissionScore / points_possible) * 0.9).toFixed(2),
                      );
                      totalScore += submissionScore * 0.9;
                      totalPossibleScore += points_possible;
                    } else {
                      totalScore += submissionScore;
                      totalPossibleScore += points_possible;
                    }
                  }
                }
              } catch (error) {
                console.error("Error processing data:", error.message);
                break;
              }
            }
      
            student.avg = totalScore / totalPossibleScore;
            result.push(student);
          });
        } catch (error) {
          console.log(`Error: ${error.message}`);
        }
      
        return result;
      };
      
      const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
      console.log(result);
      