// Initialize DOM elements with proper types
const saveResumeButton: HTMLButtonElement = document.getElementById("save-resume-button") as HTMLButtonElement;
const deleteResumeButton: HTMLButtonElement = document.getElementById("delete-resume-button") as HTMLButtonElement;
const previewContentDiv: HTMLElement = document.getElementById("preview-content") as HTMLElement;
const resumeHeadingInput: HTMLInputElement = document.getElementById("resume-heading") as HTMLInputElement;
const imageInput: HTMLInputElement = document.getElementById("image-input") as HTMLInputElement;
const objectivesInput: HTMLTextAreaElement = document.getElementById("objectives") as HTMLTextAreaElement;
const educationInput: HTMLTextAreaElement = document.getElementById("education") as HTMLTextAreaElement;
const skillsInput: HTMLTextAreaElement = document.getElementById("skills") as HTMLTextAreaElement;
const experienceInput: HTMLTextAreaElement = document.getElementById("experience") as HTMLTextAreaElement;
const certificationsInput: HTMLTextAreaElement = document.getElementById("certifications") as HTMLTextAreaElement;
const referencesInput: HTMLTextAreaElement = document.getElementById("references") as HTMLTextAreaElement;

// Interface to define the structure of resume data
interface ResumeData {
  name: string;
  image: string;
  objectives: string;
  education: string;
  skills: string;
  experience: string;
  certifications: string;
  references: string;
}

// Load Resume Function
function loadResume(): void {
  const resumeData: ResumeData | null = JSON.parse(localStorage.getItem("resumeData") || 'null');
  previewContentDiv.innerHTML = "";
  if (resumeData) {
    previewContentDiv.innerHTML = `
      <img src="${resumeData.image}" class="image" alt="Profile Image"/>
      <h1 class='text-center'>${resumeData.name}</h1>
      <h3>Objectives:</h3><p class="preview-text">${resumeData.objectives.replace(
        /\n/g,
        "<br>"
      )}</p>
      <h3>Education:</h3><p class="preview-text">${resumeData.education.replace(
        /\n/g,
        "<br>"
      )}</p>
      <h3>Skills:</h3><p class="preview-text">${resumeData.skills.replace(
        /\n/g,
        "<br>"
      )}</p>
      <h3>Experience:</h3><p class="preview-text">${resumeData.experience.replace(
        /\n/g,
        "<br>"
      )}</p>
      <h3>Certifications:</h3><p class="preview-text">${resumeData.certifications.replace(
        /\n/g,
        "<br>"
      )}</p>
      <h3>References:</h3><p class="preview-text">${resumeData.references.replace(
        /\n/g,
        "<br>"
      )}</p>
    `;
  } else {
    previewContentDiv.innerHTML =
      "<p>No resume data available. Please fill out the form and save.</p>";
  }
}

// Save Resume
saveResumeButton.addEventListener("click", (): void => {
  // Check if all required fields are filled
  if (
    !resumeHeadingInput.value ||
    !objectivesInput.value ||
    !educationInput.value ||
    !skillsInput.value ||
    !experienceInput.value ||
    !certificationsInput.value ||
    !referencesInput.value
  ) {
    alert("Please fill out the form first.");
    return; // Exit the function if validation fails
  }

  const resumeData: ResumeData = {
    name: resumeHeadingInput.value,
    image:
      imageInput.files && imageInput.files.length > 0
        ? URL.createObjectURL(imageInput.files[0])
        : "",
    objectives: objectivesInput.value,
    education: educationInput.value,
    skills: skillsInput.value,
    experience: experienceInput.value,
    certifications: certificationsInput.value,
    references: referencesInput.value,
  };

  localStorage.setItem("resumeData", JSON.stringify(resumeData));
  loadResume();
});

// Delete Resume
deleteResumeButton.addEventListener("click", (): void => {
  localStorage.removeItem("resumeData");
  loadResume(); // Reload preview to show no data
});

// Load saved resume data on page load
loadResume();
