// LinkedIn Profile Reviewer MVP - Enhanced JavaScript

// Sample data and analysis results
const sampleData = {
  sampleProfile: `Software Engineer at Tech Corp

Experienced software engineer with 5 years in full-stack development. Passionate about building scalable applications using React, Node.js, and cloud technologies. Currently working on AI-powered solutions for business automation.

Experience:
• Software Engineer at Tech Corp (2020-Present)
- Developed web applications using React and Node.js
- Collaborated with cross-functional teams of 8+ developers
- Implemented CI/CD pipelines reducing deployment time by 60%
- Built microservices handling 100K+ daily active users

• Junior Developer at StartupXYZ (2018-2020)
- Created responsive web interfaces using HTML, CSS, JavaScript
- Worked with REST APIs and third-party integrations
- Participated in agile development processes

Skills: JavaScript, React, Node.js, Python, AWS, Docker, MongoDB, Git, Agile, Scrum`,

  analysisResults: {
    overallScore: 72,
    overallFeedback: "Good foundation with room for improvement. Your profile shows relevant experience but could benefit from more quantified achievements and keyword optimization.",
    sections: {
      headline: {
        score: 65,
        feedback: "Your headline is functional but lacks impact. Consider adding your value proposition and key achievements.",
        recommendation: "Try: 'Senior Software Engineer | Full-Stack Developer | AI Solutions Expert | Building Scalable Applications at Tech Corp'",
        improvements: ["Add specific technologies", "Include years of experience", "Mention area of expertise", "Add value proposition"]
      },
      summary: {
        score: 78,
        feedback: "Good foundation with relevant experience mentioned. Could be more compelling with specific achievements.",
        recommendation: "Quantify your impact with metrics, add specific technologies, and mention notable projects or achievements.",
        improvements: ["Add quantifiable achievements", "Include specific project examples", "Mention team size or budget managed", "Add call-to-action"]
      },
      experience: {
        score: 70,
        feedback: "Experience section covers the basics but lacks detail and impact metrics.",
        recommendation: "Use action verbs, add specific metrics (users served, performance improvements, cost savings), and detail your key accomplishments.",
        improvements: ["Add quantified results", "Use stronger action verbs", "Include project outcomes", "Show career progression"]
      },
      skills: {
        score: 75,
        feedback: "Good technical skill coverage. Consider organizing by categories and adding soft skills.",
        recommendation: "Organize into categories: Programming Languages, Frameworks, Tools, Soft Skills. Add relevant certifications.",
        improvements: ["Categorize skills", "Add soft skills", "Include certifications", "Add trending technologies"]
      }
    },
    keywordOptimization: {
      score: 68,
      missingKeywords: ["Senior", "Lead", "Agile", "Scrum", "API Development", "Database Design", "DevOps", "Cloud Architecture"],
      industryKeywords: ["Software Engineering", "Full-Stack", "React", "Node.js", "Cloud", "JavaScript", "Python"],
      recommendation: "Include industry-specific keywords that recruiters commonly search for in your field."
    },
    overallRecommendations: [
      "Add a professional headshot to increase profile views by up to 21x",
      "Expand your network by connecting with colleagues and industry professionals",
      "Share industry insights and engage with posts to increase visibility",
      "Request recommendations from current and former colleagues",
      "Update your profile regularly with new projects and achievements",
      "Join relevant LinkedIn groups in your industry",
      "Use LinkedIn's skills assessment feature to validate your expertise"
    ],
    actionPlan: [
      {
        priority: "High",
        task: "Update your headline with specific technologies and value proposition",
        timeframe: "Today"
      },
      {
        priority: "High", 
        task: "Add quantified achievements to your experience section",
        timeframe: "This week"
      },
      {
        priority: "Medium",
        task: "Reorganize skills section with categories and add certifications",
        timeframe: "This week"
      },
      {
        priority: "Medium",
        task: "Request recommendations from 3-5 colleagues",
        timeframe: "Next 2 weeks"
      },
      {
        priority: "Low",
        task: "Join 5 relevant industry groups and start engaging",
        timeframe: "Next month"
      }
    ]
  }
};

// Utility Functions
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function loadSampleProfile() {
  const textarea = document.getElementById('profileInput');
  textarea.value = sampleData.sampleProfile;
  textarea.focus();
  updateCharCount();
  
  // Show success message
  showNotification('✅ Sample profile loaded! Click "Analyze Profile" to see results.', 'success');
}

function clearProfile() {
  const textarea = document.getElementById('profileInput');
  textarea.value = '';
  textarea.focus();
  updateCharCount();
  
  // Hide results if showing
  document.getElementById('results').style.display = 'none';
  
  showNotification('🗑️ Profile cleared!', 'info');
}

function updateCharCount() {
  const textarea = document.getElementById('profileInput');
  const charCount = document.getElementById('charCount');
  const count = textarea.value.length;
  charCount.textContent = `${count} characters`;
  
  // Color coding based on length
  if (count < 500) {
    charCount.style.color = '#ef4444';
  } else if (count < 1000) {
    charCount.style.color = '#f59e0b';
  } else {
    charCount.style.color = '#10b981';
  }
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.textContent = message;
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 20px',
    borderRadius: '8px',
    color: 'white',
    zIndex: '10000',
    fontSize: '14px',
    fontWeight: '500',
    maxWidth: '300px',
    wordWrap: 'break-word',
    backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
  });
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

function getScoreClass(score) {
  if (score >= 80) return 'score--excellent';
  if (score >= 60) return 'score--good';
  if (score >= 40) return 'score--average';
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

  // Update score with animation
  let currentScore = 0;
  const targetScore = sectionData.score;
  const increment = targetScore / 30;
  
  const scoreAnimation = setInterval(() => {
    currentScore += increment;
    if (currentScore >= targetScore) {
      currentScore = targetScore;
      clearInterval(scoreAnimation);
    }
    scoreElement.textContent = Math.round(currentScore);
  }, 50);
  
  scoreElement.className = `score ${getScoreClass(sectionData.score)}`;

  // Update content
  feedbackElement.textContent = sectionData.feedback;
  recommendationElement.textContent = sectionData.recommendation;

  // Update improvements list
  improvementsList.innerHTML = '';
  sectionData.improvements.forEach((improvement, index) => {
    const li = document.createElement('li');
    li.textContent = improvement;
    li.style.opacity = '0';
    li.style.transform = 'translateY(10px)';
    improvementsList.appendChild(li);
    
    // Animate list items
    setTimeout(() => {
      li.style.transition = 'all 0.3s ease';
      li.style.opacity = '1';
      li.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

function displayKeywordAnalysis(keywordData) {
  const missingKeywordsElement = document.getElementById('missingKeywords');
  const industryKeywordsElement = document.getElementById('industryKeywords');

  // Display missing keywords
  missingKeywordsElement.innerHTML = '';
  keywordData.missingKeywords.forEach((keyword, index) => {
    setTimeout(() => {
      const tag = document.createElement('span');
      tag.className = 'keyword-tag keyword-tag--missing';
      tag.textContent = keyword;
      tag.style.opacity = '0';
      tag.style.transform = 'scale(0.8)';
      missingKeywordsElement.appendChild(tag);
      
      setTimeout(() => {
        tag.style.transition = 'all 0.2s ease';
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1)';
      }, 50);
    }, index * 100);
  });

  // Display industry keywords
  industryKeywordsElement.innerHTML = '';
  keywordData.industryKeywords.forEach((keyword, index) => {
    setTimeout(() => {
      const tag = document.createElement('span');
      tag.className = 'keyword-tag keyword-tag--found';
      tag.textContent = keyword;
      tag.style.opacity = '0';
      tag.style.transform = 'scale(0.8)';
      industryKeywordsElement.appendChild(tag);
      
      setTimeout(() => {
        tag.style.transition = 'all 0.2s ease';
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1)';
      }, 50);
    }, index * 100);
  });
}

function displayOverallRecommendations(recommendations) {
  const list = document.getElementById('overallRecommendationsList');
  list.innerHTML = '';
  
  recommendations.forEach((recommendation, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="recommendation-icon">💡</span> ${recommendation}`;
    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    list.appendChild(li);
    
    setTimeout(() => {
      li.style.transition = 'all 0.3s ease';
      li.style.opacity = '1';
      li.style.transform = 'translateX(0)';
    }, index * 100);
  });
}

function displayActionPlan(actionPlan) {
  const container = document.getElementById('actionPlan');
  container.innerHTML = '';
  
  actionPlan.forEach((action, index) => {
    const actionElement = document.createElement('div');
    actionElement.className = `action-step action-step--${action.priority.toLowerCase()}`;
    actionElement.innerHTML = `
      <div class="action-step__header">
        <span class="action-step__priority">${action.priority} Priority</span>
        <span class="action-step__timeframe">${action.timeframe}</span>
      </div>
      <p class="action-step__task">${action.task}</p>
    `;
    
    actionElement.style.opacity = '0';
    actionElement.style.transform = 'translateY(20px)';
    container.appendChild(actionElement);
    
    setTimeout(() => {
      actionElement.style.transition = 'all 0.3s ease';
      actionElement.style.opacity = '1';
      actionElement.style.transform = 'translateY(0)';
    }, index * 150);
  });
}

function analyzeProfile() {
  const profileText = document.getElementById('profileInput').value.trim();
  
  if (!profileText) {
    showNotification('❌ Please enter your LinkedIn profile content first.', 'error');
    document.getElementById('profileInput').focus();
    return;
  }

  if (profileText.length < 100) {
    showNotification('⚠️ Profile content seems too short. Please add more details for better analysis.', 'error');
    return;
  }

  // Show loading state
  const analyzeBtn = document.getElementById('analyzeBtn');
  const btnText = analyzeBtn.querySelector('.btn__text');
  const btnLoader = analyzeBtn.querySelector('.btn__loader');
  
  btnText.style.display = 'none';
  btnLoader.style.display = 'flex';
  analyzeBtn.disabled = true;

  // Scroll to results area
  setTimeout(() => {
    scrollToSection('results');
  }, 500);

  // Simulate API call delay with progress updates
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 90) progress = 90;
  }, 200);

  setTimeout(() => {
    clearInterval(progressInterval);
    
    // Hide loading state
    btnText.style.display = 'block';
    btnLoader.style.display = 'none';
    analyzeBtn.disabled = false;

    // Display results
    displayResults();
    showNotification('✅ Analysis complete! Check your results below.', 'success');
  }, 3000);
}

function analyzeAgain() {
  document.getElementById('results').style.display = 'none';
  scrollToSection('analyzer');
  document.getElementById('profileInput').focus();
}

function displayResults() {
  const results = sampleData.analysisResults;
  
  // Show results section with animation
  const resultsSection = document.getElementById('results');
  resultsSection.style.display = 'block';
  resultsSection.style.opacity = '0';
  resultsSection.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    resultsSection.style.transition = 'all 0.5s ease';
    resultsSection.style.opacity = '1';
    resultsSection.style.transform = 'translateY(0)';
  }, 100);
  
  // Update overall score with animation
  const overallScoreElement = document.getElementById('overallScore');
  const overallFeedbackElement = document.getElementById('overallFeedback');
  
  let currentScore = 0;
  const targetScore = results.overallScore;
  const increment = targetScore / 50;
  
  const scoreAnimation = setInterval(() => {
    currentScore += increment;
    if (currentScore >= targetScore) {
      currentScore = targetScore;
      clearInterval(scoreAnimation);
    }
    overallScoreElement.textContent = Math.round(currentScore);
  }, 30);
  
  overallScoreElement.className = `score score--large ${getScoreClass(results.overallScore)}`;
  overallFeedbackElement.textContent = results.overallFeedback;
  
  // Update progress bar
  updateProgressBar('overallProgress', results.overallScore);
  
  // Display section scores with staggered animation
  Object.keys(results.sections).forEach((sectionKey, index) => {
    setTimeout(() => {
      displaySectionScore(sectionKey, results.sections[sectionKey]);
    }, index * 200);
  });
  
  // Display keyword analysis
  setTimeout(() => {
    displayKeywordAnalysis(results.keywordOptimization);
  }, 800);
  
  // Display overall recommendations
  setTimeout(() => {
    displayOverallRecommendations(results.overallRecommendations);
  }, 1000);
  
  // Display action plan
  setTimeout(() => {
    displayActionPlan(results.actionPlan);
  }, 1200);
}

function downloadReport() {
  const results = sampleData.analysisResults;
  let reportContent = `LINKEDIN PROFILE ANALYSIS REPORT
Generated on: ${new Date().toLocaleDateString()}
Overall Score: ${results.overallScore}/100

═══════════════════════════════════════════════════

EXECUTIVE SUMMARY
${results.overallFeedback}

═══════════════════════════════════════════════════

SECTION-WISE ANALYSIS
`;
  
  // Add section analysis
  Object.keys(results.sections).forEach(sectionKey => {
    const section = results.sections[sectionKey];
    reportContent += `
${sectionKey.toUpperCase()} (Score: ${section.score}/100)
${section.feedback}

Recommendation: ${section.recommendation}

Key Improvements:`;
    section.improvements.forEach(improvement => {
      reportContent += `\n• ${improvement}`;
    });
    reportContent += '\n';
  });
  
  // Add keyword analysis
  reportContent += `
═══════════════════════════════════════════════════

KEYWORD OPTIMIZATION (Score: ${results.keywordOptimization.score}/100)
${results.keywordOptimization.recommendation}

Missing Keywords: ${results.keywordOptimization.missingKeywords.join(', ')}
Found Keywords: ${results.keywordOptimization.industryKeywords.join(', ')}

═══════════════════════════════════════════════════

OVERALL RECOMMENDATIONS`;
  results.overallRecommendations.forEach(recommendation => {
    reportContent += `\n• ${recommendation}`;
  });
  
  // Add action plan
  reportContent += `

═══════════════════════════════════════════════════

ACTION PLAN`;
  results.actionPlan.forEach(action => {
    reportContent += `\n${action.priority} Priority (${action.timeframe}): ${action.task}`;
  });
  
  reportContent += `

═══════════════════════════════════════════════════

Generated by ProfileAnalyzer - AI-Powered LinkedIn Profile Optimization
Visit: your-app-url.vercel.app`;
  
  // Create and download file
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `linkedin-profile-analysis-${new Date().toISOString().split('T')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
  
  showNotification('📄 Report downloaded successfully!', 'success');
}

function copyRecommendations() {
  const results = sampleData.analysisResults;
  let recommendationsText = '🚀 LINKEDIN PROFILE IMPROVEMENT RECOMMENDATIONS\n\n';
  
  recommendationsText += `Overall Score: ${results.overallScore}/100\n\n`;
  
  Object.keys(results.sections).forEach(sectionKey => {
    const section = results.sections[sectionKey];
    recommendationsText += `${sectionKey.toUpperCase()} (${section.score}/100):\n`;
    recommendationsText += `${section.recommendation}\n\n`;
  });
  
  recommendationsText += 'NEXT ACTIONS:\n';
  results.actionPlan.forEach((action, index) => {
    recommendationsText += `${index + 1}. ${action.task} (${action.priority} Priority - ${action.timeframe})\n`;
  });
  
  navigator.clipboard.writeText(recommendationsText).then(() => {
    showNotification('📋 Recommendations copied to clipboard!', 'success');
  }).catch(err => {
    console.error('Failed to copy: ', err);
    showNotification('❌ Failed to copy recommendations. Please try again.', 'error');
  });
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('LinkedIn Profile Reviewer MVP loaded successfully!');
  
  const textarea = document.getElementById('profileInput');
  
  // Add character count functionality
  textarea.addEventListener('input', updateCharCount);
  updateCharCount(); // Initial count
  
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
  
  // Auto-resize textarea
  textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });
});
