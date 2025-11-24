/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id"),
      sectionsClass = document.querySelector(
        ".nav__menu a[href*=" + sectionId + "]"
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionsClass.classList.add("active-link");
    } else {
      sectionsClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== RESUME BUILDER FUNCTIONALITY ===============*/

// Default resume data
const defaultResumeData = {
  name: "Shubham Kashyap",
  profession: "FRONTEND DEVELOPER",
  bio: "Hi, I'm Shubham Kashyap, based in Uttar Pradesh - India, I do custom work and do market research before starting any project, giving you a fair advantage in delivering the best outcome for the client.",
  phone: "(0+) 987-654-321",
  email: "shubham@email.com",
  website: "www.mywebsite.com",
  socialLinks: {
    github: "https://github.com/",
    dribbble: "https://dribbble.com/",
    linkedin: "https://www.linkedin.com/"
  },
  skills: [
    "HTML & CSS",
    "JavaScript",
    "React",
    "Git & GitHub",
    "Bootstrap",
    "Figma"
  ],
  education: [
    {
      title: "Master In Web Developer",
      institution: "AKTU - University",
      period: "2012 - 2017"
    },
    {
      title: "Fontend Developer",
      institution: "Spain - University",
      period: "2017 - 2022"
    },
    {
      title: "Graphic Designer",
      institution: "AKTU - University",
      period: "2019 - 2023"
    }
  ],
  work: [
    {
      title: "Web Developer Director",
      company: "Adobe - Spain",
      period: "2012 - 2017",
      description: "I worked in the company providing experience in the labor field and doing quality work."
    },
    {
      title: "Design Manager",
      company: "Figma - India",
      period: "2020 - 2022",
      description: "I worked in the company providing experience in the labor field and doing quality work."
    },
    {
      title: "Software Engineer",
      company: "Adobe - India",
      period: "2012 - 2017",
      description: "I worked in the company providing experience in the labor field and doing quality work."
    }
  ],
  certificates: [
    {
      title: "Modern Web Development",
      issuer: "Master Web Inc - 2015"
    },
    {
      title: "Component Design",
      issuer: "Design & Company - 2020"
    },
    {
      title: "Layout Of Structural Websites",
      issuer: "University of AKTU - 2022"
    }
  ],
  references: [
    {
      name: "Ris Allison",
      position: "CEO Industria Inc",
      contact: "user@email.com / 987-654-3210"
    },
    {
      name: "Edyson Harris",
      position: "CEO Industria Inc",
      contact: "user@email.com / 987-654-3210"
    },
    {
      name: "Anne Lort",
      position: "CEO Industria Inc",
      contact: "user@email.com / 987-654-3210"
    }
  ]
};

// Load resume data from localStorage or use default
let resumeData = JSON.parse(localStorage.getItem("resumeData")) || defaultResumeData;
let isEditMode = false;

// Initialize the resume builder
function initResumeBuilder() {
  loadResumeData();
  setupEditButton();
}

// Save resume data to localStorage
function saveResumeData() {
  localStorage.setItem("resumeData", JSON.stringify(resumeData));
}

// Load and display resume data
function loadResumeData() {
  // Update personal info
  document.querySelectorAll(".home__name").forEach(el => {
    el.innerHTML = `HELLO, I'M <br>${resumeData.name}`;
  });
  document.querySelector(".nav__logo").textContent = resumeData.name;
  
  const professionLines = resumeData.profession.split(" ");
  if (professionLines.length >= 2) {
    document.querySelector(".home__profession").innerHTML = `${professionLines[0]} <br>${professionLines.slice(1).join(" ")}`;
  } else {
    document.querySelector(".home__profession").textContent = resumeData.profession;
  }
  
  document.querySelector(".about__container p").textContent = resumeData.bio;
  document.querySelector(".footer__info").textContent = resumeData.phone;
  document.querySelectorAll(".footer__info")[1].textContent = resumeData.email;
  document.querySelector(".footer__link").textContent = resumeData.website;
  document.querySelector(".footer__link").href = `https://${resumeData.website}`;
  
  // Update social links
  const socialLinks = document.querySelectorAll(".about__social-link");
  socialLinks[0].href = resumeData.socialLinks.github;
  socialLinks[1].href = resumeData.socialLinks.dribbble;
  socialLinks[2].href = resumeData.socialLinks.linkedin;
  
  // Update skills
  const skillContainer = document.querySelector(".skill__container");
  skillContainer.innerHTML = `<div class="skills__content">
    <ul class="skill__list">
      ${resumeData.skills.map(skill => `
        <li class="resume__title">
          <i class="ri-arrow-drop-right-line"></i> ${skill}
        </li>
      `).join("")}
    </ul>
  </div>`;
  
  // Update education
  const educationContainer = document.querySelector(".education__container");
  educationContainer.innerHTML = resumeData.education.map(edu => `
    <div>
      <h2 class="resume__title">
        <i class="ri-arrow-drop-right-line"></i> ${edu.title}
      </h2>
      <div class="resume__data">
        <span>${edu.institution}</span>
        <span>${edu.period}</span>
      </div>
    </div>
  `).join("");
  
  // Update work experience
  const workContainer = document.querySelector(".work__container");
  workContainer.innerHTML = resumeData.work.map(job => `
    <div>
      <h2 class="resume__title">
        <i class="ri-arrow-drop-right-line"></i> ${job.title}
      </h2>
      <div class="resume__data">
        <span>${job.company} / ${job.period}</span>
        <p>${job.description}</p>
      </div>
    </div>
  `).join("");
  
  // Update certificates
  const certificatesContainer = document.querySelector(".certificates__container");
  certificatesContainer.innerHTML = resumeData.certificates.map(cert => `
    <div>
      <h2 class="resume__title">
        <i class="ri-arrow-drop-right-line"></i> ${cert.title}
      </h2>
      <div class="resume__data">
        <span>${cert.issuer}</span>
      </div>
    </div>
  `).join("");
  
  // Update references
  const referencesContainer = document.querySelector(".references__container");
  referencesContainer.innerHTML = resumeData.references.map(ref => `
    <div>
      <h2 class="resume__title">
        <i class="ri-arrow-drop-right-line"></i> ${ref.name}
      </h2>
      <div class="resume__data">
        <span>${ref.position}</span>
        <span>${ref.contact}</span>
      </div>
    </div>
  `).join("");
}

// Setup edit button
function setupEditButton() {
  const editButton = document.getElementById("edit-button");
  if (!editButton) return;
  
  editButton.addEventListener("click", () => {
    isEditMode = !isEditMode;
    if (isEditMode) {
      enterEditMode();
      editButton.innerHTML = '<i class="ri-save-line"></i>';
    } else {
      exitEditMode();
      editButton.innerHTML = '<i class="ri-edit-line"></i>';
    }
  });
}

// Enter edit mode
function enterEditMode() {
  document.body.classList.add("edit-mode");
  createEditForm();
}

// Exit edit mode and save changes
function exitEditMode() {
  document.body.classList.remove("edit-mode");
  collectFormData();
  saveResumeData();
  loadResumeData();
  removeEditForm();
}

// Create edit form overlay
function createEditForm() {
  const overlay = document.createElement("div");
  overlay.className = "edit-overlay";
  overlay.id = "edit-overlay";
  
  overlay.innerHTML = `
    <div class="edit-form">
      <div class="edit-form-header">
        <h2>Edit Resume</h2>
        <button class="close-edit" onclick="document.getElementById('edit-button').click()">
          <i class="ri-close-line"></i>
        </button>
      </div>
      <div class="edit-form-content">
        <div class="edit-section">
          <h3>Personal Information</h3>
          <label>Name: <input type="text" id="edit-name" value="${resumeData.name}"></label>
          <label>Profession: <input type="text" id="edit-profession" value="${resumeData.profession}"></label>
          <label>Bio: <textarea id="edit-bio" rows="3">${resumeData.bio}</textarea></label>
          <label>Phone: <input type="text" id="edit-phone" value="${resumeData.phone}"></label>
          <label>Email: <input type="email" id="edit-email" value="${resumeData.email}"></label>
          <label>Website: <input type="text" id="edit-website" value="${resumeData.website}"></label>
        </div>
        
        <div class="edit-section">
          <h3>Social Links</h3>
          <label>GitHub: <input type="url" id="edit-github" value="${resumeData.socialLinks.github}"></label>
          <label>Dribbble: <input type="url" id="edit-dribbble" value="${resumeData.socialLinks.dribbble}"></label>
          <label>LinkedIn: <input type="url" id="edit-linkedin" value="${resumeData.socialLinks.linkedin}"></label>
        </div>
        
        <div class="edit-section">
          <h3>Skills</h3>
          <div id="skills-list">
            ${resumeData.skills.map((skill, index) => `
              <div class="edit-item">
                <input type="text" value="${skill}" data-skill-index="${index}">
                <button class="remove-btn" onclick="removeSkill(${index})">
                  <i class="ri-delete-bin-line"></i>
                </button>
              </div>
            `).join("")}
          </div>
          <button class="add-btn" onclick="addSkill()">
            <i class="ri-add-line"></i> Add Skill
          </button>
        </div>
        
        <div class="edit-section">
          <h3>Education</h3>
          <div id="education-list">
            ${resumeData.education.map((edu, index) => `
              <div class="edit-group" data-edu-index="${index}">
                <label>Title: <input type="text" value="${edu.title}"></label>
                <label>Institution: <input type="text" value="${edu.institution}"></label>
                <label>Period: <input type="text" value="${edu.period}"></label>
                <button class="remove-btn" onclick="removeEducation(${index})">
                  <i class="ri-delete-bin-line"></i> Remove
                </button>
              </div>
            `).join("")}
          </div>
          <button class="add-btn" onclick="addEducation()">
            <i class="ri-add-line"></i> Add Education
          </button>
        </div>
        
        <div class="edit-section">
          <h3>Work Experience</h3>
          <div id="work-list">
            ${resumeData.work.map((job, index) => `
              <div class="edit-group" data-work-index="${index}">
                <label>Title: <input type="text" value="${job.title}"></label>
                <label>Company: <input type="text" value="${job.company}"></label>
                <label>Period: <input type="text" value="${job.period}"></label>
                <label>Description: <textarea rows="2">${job.description}</textarea></label>
                <button class="remove-btn" onclick="removeWork(${index})">
                  <i class="ri-delete-bin-line"></i> Remove
                </button>
              </div>
            `).join("")}
          </div>
          <button class="add-btn" onclick="addWork()">
            <i class="ri-add-line"></i> Add Work Experience
          </button>
        </div>
        
        <div class="edit-section">
          <h3>Certificates</h3>
          <div id="certificates-list">
            ${resumeData.certificates.map((cert, index) => `
              <div class="edit-group" data-cert-index="${index}">
                <label>Title: <input type="text" value="${cert.title}"></label>
                <label>Issuer: <input type="text" value="${cert.issuer}"></label>
                <button class="remove-btn" onclick="removeCertificate(${index})">
                  <i class="ri-delete-bin-line"></i> Remove
                </button>
              </div>
            `).join("")}
          </div>
          <button class="add-btn" onclick="addCertificate()">
            <i class="ri-add-line"></i> Add Certificate
          </button>
        </div>
        
        <div class="edit-section">
          <h3>References</h3>
          <div id="references-list">
            ${resumeData.references.map((ref, index) => `
              <div class="edit-group" data-ref-index="${index}">
                <label>Name: <input type="text" value="${ref.name}"></label>
                <label>Position: <input type="text" value="${ref.position}"></label>
                <label>Contact: <input type="text" value="${ref.contact}"></label>
                <button class="remove-btn" onclick="removeReference(${index})">
                  <i class="ri-delete-bin-line"></i> Remove
                </button>
              </div>
            `).join("")}
          </div>
          <button class="add-btn" onclick="addReference()">
            <i class="ri-add-line"></i> Add Reference
          </button>
        </div>
        
        <div class="edit-actions">
          <button class="reset-btn" onclick="resetToDefault()">
            <i class="ri-refresh-line"></i> Reset to Default
          </button>
          <button class="save-btn" onclick="document.getElementById('edit-button').click()">
            <i class="ri-save-line"></i> Save Changes
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(overlay);
}

// Remove edit form
function removeEditForm() {
  const overlay = document.getElementById("edit-overlay");
  if (overlay) {
    overlay.remove();
  }
}

// Collect form data
function collectFormData() {
  resumeData.name = document.getElementById("edit-name").value;
  resumeData.profession = document.getElementById("edit-profession").value;
  resumeData.bio = document.getElementById("edit-bio").value;
  resumeData.phone = document.getElementById("edit-phone").value;
  resumeData.email = document.getElementById("edit-email").value;
  resumeData.website = document.getElementById("edit-website").value;
  
  resumeData.socialLinks.github = document.getElementById("edit-github").value;
  resumeData.socialLinks.dribbble = document.getElementById("edit-dribbble").value;
  resumeData.socialLinks.linkedin = document.getElementById("edit-linkedin").value;
  
  // Collect skills
  const skillInputs = document.querySelectorAll("#skills-list input");
  resumeData.skills = Array.from(skillInputs).map(input => input.value).filter(v => v.trim());
  
  // Collect education
  const eduGroups = document.querySelectorAll("#education-list .edit-group");
  resumeData.education = Array.from(eduGroups).map(group => {
    const inputs = group.querySelectorAll("input");
    return {
      title: inputs[0].value,
      institution: inputs[1].value,
      period: inputs[2].value
    };
  });
  
  // Collect work
  const workGroups = document.querySelectorAll("#work-list .edit-group");
  resumeData.work = Array.from(workGroups).map(group => {
    const inputs = group.querySelectorAll("input");
    const textarea = group.querySelector("textarea");
    return {
      title: inputs[0].value,
      company: inputs[1].value,
      period: inputs[2].value,
      description: textarea.value
    };
  });
  
  // Collect certificates
  const certGroups = document.querySelectorAll("#certificates-list .edit-group");
  resumeData.certificates = Array.from(certGroups).map(group => {
    const inputs = group.querySelectorAll("input");
    return {
      title: inputs[0].value,
      issuer: inputs[1].value
    };
  });
  
  // Collect references
  const refGroups = document.querySelectorAll("#references-list .edit-group");
  resumeData.references = Array.from(refGroups).map(group => {
    const inputs = group.querySelectorAll("input");
    return {
      name: inputs[0].value,
      position: inputs[1].value,
      contact: inputs[2].value
    };
  });
}

// Add/Remove functions for dynamic lists
function addSkill() {
  const skillsList = document.getElementById("skills-list");
  const newIndex = document.querySelectorAll("#skills-list .edit-item").length;
  const newItem = document.createElement("div");
  newItem.className = "edit-item";
  newItem.innerHTML = `
    <input type="text" value="" data-skill-index="${newIndex}">
    <button class="remove-btn" onclick="removeSkill(${newIndex})">
      <i class="ri-delete-bin-line"></i>
    </button>
  `;
  skillsList.appendChild(newItem);
}

function removeSkill(index) {
  const item = document.querySelector(`[data-skill-index="${index}"]`).parentElement;
  item.remove();
}

function addEducation() {
  const eduList = document.getElementById("education-list");
  const newIndex = document.querySelectorAll("#education-list .edit-group").length;
  const newGroup = document.createElement("div");
  newGroup.className = "edit-group";
  newGroup.setAttribute("data-edu-index", newIndex);
  newGroup.innerHTML = `
    <label>Title: <input type="text" value=""></label>
    <label>Institution: <input type="text" value=""></label>
    <label>Period: <input type="text" value=""></label>
    <button class="remove-btn" onclick="removeEducation(${newIndex})">
      <i class="ri-delete-bin-line"></i> Remove
    </button>
  `;
  eduList.appendChild(newGroup);
}

function removeEducation(index) {
  const item = document.querySelector(`[data-edu-index="${index}"]`);
  item.remove();
}

function addWork() {
  const workList = document.getElementById("work-list");
  const newIndex = document.querySelectorAll("#work-list .edit-group").length;
  const newGroup = document.createElement("div");
  newGroup.className = "edit-group";
  newGroup.setAttribute("data-work-index", newIndex);
  newGroup.innerHTML = `
    <label>Title: <input type="text" value=""></label>
    <label>Company: <input type="text" value=""></label>
    <label>Period: <input type="text" value=""></label>
    <label>Description: <textarea rows="2"></textarea></label>
    <button class="remove-btn" onclick="removeWork(${newIndex})">
      <i class="ri-delete-bin-line"></i> Remove
    </button>
  `;
  workList.appendChild(newGroup);
}

function removeWork(index) {
  const item = document.querySelector(`[data-work-index="${index}"]`);
  item.remove();
}

function addCertificate() {
  const certList = document.getElementById("certificates-list");
  const newIndex = document.querySelectorAll("#certificates-list .edit-group").length;
  const newGroup = document.createElement("div");
  newGroup.className = "edit-group";
  newGroup.setAttribute("data-cert-index", newIndex);
  newGroup.innerHTML = `
    <label>Title: <input type="text" value=""></label>
    <label>Issuer: <input type="text" value=""></label>
    <button class="remove-btn" onclick="removeCertificate(${newIndex})">
      <i class="ri-delete-bin-line"></i> Remove
    </button>
  `;
  certList.appendChild(newGroup);
}

function removeCertificate(index) {
  const item = document.querySelector(`[data-cert-index="${index}"]`);
  item.remove();
}

function addReference() {
  const refList = document.getElementById("references-list");
  const newIndex = document.querySelectorAll("#references-list .edit-group").length;
  const newGroup = document.createElement("div");
  newGroup.className = "edit-group";
  newGroup.setAttribute("data-ref-index", newIndex);
  newGroup.innerHTML = `
    <label>Name: <input type="text" value=""></label>
    <label>Position: <input type="text" value=""></label>
    <label>Contact: <input type="text" value=""></label>
    <button class="remove-btn" onclick="removeReference(${newIndex})">
      <i class="ri-delete-bin-line"></i> Remove
    </button>
  `;
  refList.appendChild(newGroup);
}

function removeReference(index) {
  const item = document.querySelector(`[data-ref-index="${index}"]`);
  item.remove();
}

function resetToDefault() {
  if (confirm("Are you sure you want to reset to default resume? This will erase all your changes.")) {
    resumeData = JSON.parse(JSON.stringify(defaultResumeData));
    saveResumeData();
    loadResumeData();
    document.getElementById("edit-button").click();
  }
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", initResumeBuilder);
