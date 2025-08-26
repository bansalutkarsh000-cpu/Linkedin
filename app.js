// LinkedIn Profile Reviewer MVP - JavaScript

// Sample data and analysis results
const sampleData = {
  sampleProfile: `Software Engineer at Tech Corp

Experienced software engineer with 5 years in full-stack development. Passionate about building scalable applications using React, Node.js, and cloud technologies. Currently working on AI-powered solutions for business automation.

Experience:
• Software Engineer at Tech Corp (2020-Present)
- Developed web applications using React and Node.js
- Collaborated with cross-functional teams
- Implemented CI/CD pipelines

Skills: JavaScript, React, Node.js, Python, AWS, Docker`,

  analysisResults: {
    overallScore: 72,
    sections: {
      headline: {
        score: 65,
        feedback: "Your headline is functional but lacks impact. Consider adding your value proposition and key achievements.",
        recommendation: "Try: 'Senior Software Engineer | Full-Stack Developer | AI Solutions Expert | Building Scalable Applications at Tech Corp'",
        improvements: ["Add specific technologies", "Include years of experience", "Mention area of expertise"]
      },
      summary: {
        score: 78,
        feedback: "Good foundation with relevant experience mentioned. Could be more compelling with specific achievements.",
        recommendation: "Quantify your impact with metrics, add specific technologies, and mention notable projects or achievements.",
        improvements: ["Add quantifiable achievements", "Include specific project examples", "Mention team size or budget managed"]
      },
      experience: {
        score: 70,
        feedback: "Experience section covers the basics but lacks detail and impact metrics.",
        recommendation: "Use action verbs, add specific metrics (users served, performance improvements, cost savings), and detail your key accomplishments.",
        improvements: ["Add quantified results", "Use stronger action verbs", "Include project outcomes"]
      },
      skills: {
        score: 75,
        feedback: "Good technical skill coverage. Consider organizing by categories and adding soft skills.",
        recommendation: "Organize into categories: Programming Languages, Frameworks, Tools, Soft Skills. Add relevant certifications.",
        improvements: ["Categorize skills", "Add soft skills", "Include certifications"]
      }
    },
    keywordOptimization: {
      score: 68,
      missingKeywords: ["Senior", "Lead", "Agile", "Scrum", "API Development", "Database Design"],
      industryKeywords: ["Software Engineering", "Full-Stack", "React", "Node.js", "Cloud"],
      recommendation: "Include industry-specific keywords that recruiters commonly search for in your field."
    },
    overallRecommendations: [
      "Add a professional headshot to increase profile views by up to 21x",
      "Expand your network by connecting with colleagues and industry professionals",
      "Share industry insights and engage with posts to increase visibility",
      "Request recommendations from current and former colleagues",
      "Update your profile regularly with new projects and achievements"
    ]
  }
};

// Utility Functions
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function loadSampleProfile() {
  const textarea = document.getElementById('profileInput');
  textarea.value = sampleData.sampleProfile;
  textarea.focus();
}

function getScoreClass(score) {
  if (score >= 75) return 'score--excellent';
  if (score >= 50) return 'score--good';
  return 'score--poor';
}

function updateProgressBar(elementId, score) {
  const progressBar = document.querySelector(`#${elementId} .progress-bar__fill`);
  if (progressBar) {
    setTimeout(() => {
      progressBar.style.width = `${score}%`;
    }, 500);
  }
}

function displaySectionScore(sectionId, sectionData) {
  const sectionElement = document.getElementById(`${sectionId}Score`);
  if (!sectionElement) return;

  const scoreElement = sectionElement.querySelector('.score');
  const feedbackElement = sectionElement.querySelector('.feedback');
  const recommendationElement = sectionElement.querySelector('.recommendation p');
  const improvementsList = sectionElement.querySelector('.improvements ul');

  // Update score
  scoreElement.textContent = sectionData.score;
  scoreElement.className = `score ${getScoreClass(sectionData.score)}`;

  // Update content
  feedbackElement.textContent = sectionData.feedback;
  recommendationElement.textContent = sectionData.recommendation;

  // Update improvements list
  improvementsList.innerHTML = '';
  sectionData.improvements.forEach(improvement => {
    const li = document.createElement('li');
    li.textContent = improvement;
    improvementsList.appendChild(li);
  });
}

function displayKeywordAnalysis(keywordData) {
  const missingKeywordsElement = document.getElementById('missingKeywords');
  const industryKeywordsElement = document.getElementById('industryKeywords');

  // Display missing keywords
  missingKeywordsElement.innerHTML = '';
  keywordData.missingKeywords.forEach(keyword => {
    const tag = document.createElement('span');
    tag.className = 'keyword-tag keyword-tag--missing';
    tag.textContent = keyword;
    missingKeywordsElement.appendChild(tag);
  });

  // Display industry keywords
  industryKeywordsElement.innerHTML = '';
  keywordData.industryKeywords.forEach(keyword => {
    const tag = document.createElement('span');
    tag.className = 'keyword-tag keyword-tag--found';
    tag.textContent = keyword;
    industryKeywordsElement.appendChild(tag);
  });
}

function displayOverallRecommendations(recommendations) {
  const list = document.getElementById('overallRecommendationsList');
  list.innerHTML = '';
  
  recommendations.forEach(recommendation => {
    const li = document.createElement('li');
    li.textContent = recommendation;
    list.appendChild(li);
  });
}

function analyzeProfile() {
  const profileText = document.getElementById('profileInput').value.trim();
  
  if (!profileText) {
    alert('Please enter your LinkedIn profile content first.');
    return;
  }

  // Show loading state
  const analyzeBtn = document.getElementById('analyzeBtn');
  const btnText = analyzeBtn.querySelector('.btn__text');
  const btnLoader = analyzeBtn.querySelector('.btn__loader');
  
  btnText.style.display = 'none';
  btnLoader.style.display = 'block';
  analyzeBtn.disabled = true;

  // Simulate API call delay
  setTimeout(() => {
    // Hide loading state
    btnText.style.display = 'block';
    btnLoader.style.display = 'none';
    analyzeBtn.disabled = false;

    // Display results
    displayResults();
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, 2000);
}

function displayResults() {
  const results = sampleData.analysisResults;
  
  // Show results section
  document.getElementById('results').style.display = 'block';
  
  // Update overall score
  const overallScoreElement = document.getElementById('overallScore');
  overallScoreElement.textContent = results.overallScore;
  overallScoreElement.className = `score score--large ${getScoreClass(results.overallScore)}`;
  
  // Update progress bar
  updateProgressBar('overallProgress', results.overallScore);
  
  // Display section scores
  Object.keys(results.sections).forEach(sectionKey => {
    displaySectionScore(sectionKey, results.sections[sectionKey]);
  });
  
  // Display keyword analysis
  displayKeywordAnalysis(results.keywordOptimization);
  
  // Display overall recommendations
  displayOverallRecommendations(results.overallRecommendations);
}

function downloadReport() {
  const results = sampleData.analysisResults;
  let reportContent = `LinkedIn Profile Analysis Report\n\n`;
  reportContent += `Overall Score: ${results.overallScore}/100\n\n`;
  
  // Add section analysis
  Object.keys(results.sections).forEach(sectionKey => {
    const section = results.sections[sectionKey];
    reportContent += `${sectionKey.toUpperCase()} ANALYSIS\n`;
    reportContent += `Score: ${section.score}/100\n`;
    reportContent += `Feedback: ${section.feedback}\n`;
    reportContent += `Recommendation: ${section.recommendation}\n`;
    reportContent += `Improvements:\n`;
    section.improvements.forEach(improvement => {
      reportContent += `- ${improvement}\n`;
    });
    reportContent += '\n';
  });
  
  // Add overall recommendations
  reportContent += 'OVERALL RECOMMENDATIONS\n';
  results.overallRecommendations.forEach(recommendation => {
    reportContent += `- ${recommendation}\n`;
  });
  
  // Create and download file
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'linkedin-profile-analysis-report.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

function copyRecommendations() {
  const results = sampleData.analysisResults;
  let recommendationsText = 'LinkedIn Profile Improvement Recommendations:\n\n';
  
  Object.keys(results.sections).forEach(sectionKey => {
    const section = results.sections[sectionKey];
    recommendationsText += `${sectionKey.toUpperCase()}:\n`;
    recommendationsText += `${section.recommendation}\n\n`;
  });
  
  navigator.clipboard.writeText(recommendationsText).then(() => {
    alert('Recommendations copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
    alert('Failed to copy recommendations. Please try again.');
  });
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('LinkedIn Profile Reviewer MVP loaded successfully!');
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
