// Sample profile data
const sampleProfileData = `Software Engineer at Tech Corp

Experienced software engineer with 5 years in full-stack development. Passionate about building scalable applications using React, Node.js, and cloud technologies.

Experience:
• Software Engineer at Tech Corp (2020-Present)
- Developed web applications using React and Node.js
- Collaborated with cross-functional teams
- Implemented CI/CD pipelines

Skills: JavaScript, React, Node.js, Python, AWS, Docker`;

// Analysis results data
const mockAnalysisResults = {
  overallScore: 72,
  sections: {
    headline: { score: 65, feedback: "Good but could be more impactful", recommendation: "Add specific technologies and years of experience" },
    summary: { score: 78, feedback: "Solid foundation with relevant experience", recommendation: "Add quantifiable achievements and metrics" },
    experience: { score: 70, feedback: "Good structure but lacks impact metrics", recommendation: "Use action verbs and add specific results" },
    skills: { score: 75, feedback: "Good technical coverage", recommendation: "Organize by categories and add soft skills" }
  },
  recommendations: [
    "Add professional headshot to increase profile views",
    "Include quantifiable achievements in experience section", 
    "Expand network by connecting with industry professionals",
    "Request recommendations from colleagues",
    "Share industry insights regularly"
  ]
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
});

function setupEventListeners() {
  // Get Started buttons
  const getStartedBtn = document.querySelector('.get-started-btn');
  const heroCta = document.querySelector('.hero-cta');
  
  if (getStartedBtn) {
    getStartedBtn.onclick = function() {
      scrollToSection('analyzer');
    };
  }
  
  if (heroCta) {
    heroCta.onclick = function() {
      scrollToSection('analyzer');
    };
  }
  
  // Load Sample button
  const loadSampleBtn = document.querySelector('.load-sample-btn');
  if (loadSampleBtn) {
    loadSampleBtn.onclick = function() {
      loadSample();
    };
  }
  
  // Analyze button
  const analyzeBtn = document.querySelector('.analyze-btn');
  if (analyzeBtn) {
    analyzeBtn.onclick = function() {
      startAnalysis();
    };
  }
  
  // Download button
  const downloadBtn = document.querySelector('.download-btn');
  if (downloadBtn) {
    downloadBtn.onclick = function() {
      downloadReport();
    };
  }
  
  // Textarea auto-resize
  const textarea = document.getElementById('profile-input');
  if (textarea) {
    textarea.oninput = function() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    };
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Focus textarea after scroll
    setTimeout(function() {
      const textarea = document.getElementById('profile-input');
      if (textarea) textarea.focus();
    }, 800);
  }
}

function loadSample() {
  const textarea = document.getElementById('profile-input');
  if (textarea) {
    textarea.value = sampleProfileData;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    
    // Visual feedback
    textarea.style.background = 'var(--color-bg-3)';
    setTimeout(function() {
      textarea.style.background = '';
    }, 300);
    
    textarea.focus();
  }
}

function startAnalysis() {
  const textarea = document.getElementById('profile-input');
  const loadingDiv = document.getElementById('loading');
  const resultsDiv = document.getElementById('results');
  const analyzeBtn = document.querySelector('.analyze-btn');
  const loadSampleBtn = document.querySelector('.load-sample-btn');
  
  if (!textarea || !textarea.value.trim()) {
    alert('Please enter your LinkedIn profile content or load a sample profile.');
    if (textarea) textarea.focus();
    return;
  }
  
  // Show loading, hide results
  if (resultsDiv) {
    resultsDiv.style.display = 'none';
    resultsDiv.classList.add('hidden');
  }
  
  if (loadingDiv) {
    loadingDiv.style.display = 'block';
    loadingDiv.classList.remove('hidden');
  }
  
  // Disable buttons
  if (analyzeBtn) {
    analyzeBtn.disabled = true;
    analyzeBtn.textContent = 'Analyzing...';
  }
  if (loadSampleBtn) {
    loadSampleBtn.disabled = true;
  }
  
  // Simulate 2-second analysis
  setTimeout(function() {
    // Hide loading
    if (loadingDiv) {
      loadingDiv.style.display = 'none';
      loadingDiv.classList.add('hidden');
    }
    
    // Show and populate results
    displayResults();
    
    if (resultsDiv) {
      resultsDiv.style.display = 'block';
      resultsDiv.classList.remove('hidden');
      
      // Scroll to results
      setTimeout(function() {
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    
    // Re-enable buttons
    if (analyzeBtn) {
      analyzeBtn.disabled = false;
      analyzeBtn.textContent = 'Analyze Profile';
    }
    if (loadSampleBtn) {
      loadSampleBtn.disabled = false;
    }
  }, 2000);
}

function displayResults() {
  // Overall score
  const overallScore = document.getElementById('overall-score');
  if (overallScore) {
    overallScore.textContent = mockAnalysisResults.overallScore;
  }
  
  // Section scores
  const sections = ['headline', 'summary', 'experience', 'skills'];
  
  sections.forEach(function(section) {
    const sectionData = mockAnalysisResults.sections[section];
    if (!sectionData) return;
    
    // Score number
    const scoreEl = document.getElementById(section + '-score');
    if (scoreEl) {
      scoreEl.textContent = sectionData.score;
    }
    
    // Score bar
    const fillEl = document.getElementById(section + '-fill');
    if (fillEl) {
      // Set color based on score
      if (sectionData.score < 60) {
        fillEl.setAttribute('data-score', 'low');
      } else if (sectionData.score < 80) {
        fillEl.setAttribute('data-score', 'medium');
      } else {
        fillEl.setAttribute('data-score', 'high');
      }
      
      // Animate width
      fillEl.style.width = '0%';
      setTimeout(function() {
        fillEl.style.width = sectionData.score + '%';
      }, 100);
    }
    
    // Feedback
    const feedbackEl = document.getElementById(section + '-feedback');
    if (feedbackEl) {
      feedbackEl.textContent = sectionData.feedback;
    }
    
    // Recommendation
    const recEl = document.getElementById(section + '-recommendation');
    if (recEl) {
      recEl.textContent = '💡 ' + sectionData.recommendation;
    }
  });
  
  // Recommendations list
  const recList = document.getElementById('recommendations-list');
  if (recList) {
    recList.innerHTML = '';
    mockAnalysisResults.recommendations.forEach(function(rec) {
      const li = document.createElement('li');
      li.textContent = rec;
      recList.appendChild(li);
    });
  }
}

function downloadReport() {
  const textarea = document.getElementById('profile-input');
  const downloadBtn = document.querySelector('.download-btn');
  
  if (!textarea || !textarea.value.trim()) {
    alert('Please analyze a profile first before downloading the report.');
    return;
  }
  
  // Generate report content
  const reportContent = generateReport(textarea.value);
  
  try {
    // Create blob and download
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = 'linkedin-profile-analysis.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Success feedback
    if (downloadBtn) {
      const originalText = downloadBtn.textContent;
      downloadBtn.textContent = 'Downloaded!';
      downloadBtn.style.backgroundColor = 'var(--color-success)';
      downloadBtn.style.color = 'white';
      
      setTimeout(function() {
        downloadBtn.textContent = originalText;
        downloadBtn.style.backgroundColor = '';
        downloadBtn.style.color = '';
      }, 2000);
    }
  } catch (error) {
    alert('Download failed. Please try again.');
  }
}

function generateReport(profileContent) {
  const date = new Date().toLocaleDateString();
  
  let report = `LinkedIn Profile Analysis Report
Generated: ${date}

OVERALL SCORE: ${mockAnalysisResults.overallScore}/100

SECTION BREAKDOWN:
================

`;

  // Add each section
  Object.keys(mockAnalysisResults.sections).forEach(function(section) {
    const data = mockAnalysisResults.sections[section];
    const name = section.charAt(0).toUpperCase() + section.slice(1);
    
    report += `${name}:
Score: ${data.score}/100
Feedback: ${data.feedback}
Recommendation: ${data.recommendation}

`;
  });
  
  report += `KEY RECOMMENDATIONS:
==================

`;
  
  mockAnalysisResults.recommendations.forEach(function(rec, i) {
    report += `${i + 1}. ${rec}
`;
  });
  
  report += `

PROFILE CONTENT ANALYZED:
========================

${profileContent}

---
Generated by ProfileAnalyzer
`;
  
  return report;
}
