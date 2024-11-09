// Initialize DOM elements with proper types
var saveResumeButton = document.getElementById("save-resume-button");
var deleteResumeButton = document.getElementById("delete-resume-button");
var previewContentDiv = document.getElementById("preview-content");
var resumeHeadingInput = document.getElementById("resume-heading");
var imageInput = document.getElementById("image-input");
var objectivesInput = document.getElementById("objectives");
var educationInput = document.getElementById("education");
var skillsInput = document.getElementById("skills");
var experienceInput = document.getElementById("experience");
var certificationsInput = document.getElementById("certifications");
var referencesInput = document.getElementById("references");
// Load Resume Function
function loadResume() {
    var resumeData = JSON.parse(localStorage.getItem("resumeData") || 'null');
    previewContentDiv.innerHTML = "";
    if (resumeData) {
        previewContentDiv.innerHTML = "\n      <img src=\"".concat(resumeData.image, "\" class=\"image\" alt=\"Profile Image\"/>\n      <h1 class='text-center'>").concat(resumeData.name, "</h1>\n      <h3>Objectives:</h3><p class=\"preview-text\">").concat(resumeData.objectives.replace(/\n/g, "<br>"), "</p>\n      <h3>Education:</h3><p class=\"preview-text\">").concat(resumeData.education.replace(/\n/g, "<br>"), "</p>\n      <h3>Skills:</h3><p class=\"preview-text\">").concat(resumeData.skills.replace(/\n/g, "<br>"), "</p>\n      <h3>Experience:</h3><p class=\"preview-text\">").concat(resumeData.experience.replace(/\n/g, "<br>"), "</p>\n      <h3>Certifications:</h3><p class=\"preview-text\">").concat(resumeData.certifications.replace(/\n/g, "<br>"), "</p>\n      <h3>References:</h3><p class=\"preview-text\">").concat(resumeData.references.replace(/\n/g, "<br>"), "</p>\n    ");
    }
    else {
        previewContentDiv.innerHTML =
            "<p>No resume data available. Please fill out the form and save.</p>";
    }
}
// Save Resume
saveResumeButton.addEventListener("click", function () {
    // Check if all required fields are filled
    if (!resumeHeadingInput.value ||
        !objectivesInput.value ||
        !educationInput.value ||
        !skillsInput.value ||
        !experienceInput.value ||
        !certificationsInput.value ||
        !referencesInput.value) {
        alert("Please fill out the form first.");
        return; // Exit the function if validation fails
    }
    var resumeData = {
        name: resumeHeadingInput.value,
        image: imageInput.files && imageInput.files.length > 0
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
deleteResumeButton.addEventListener("click", function () {
    localStorage.removeItem("resumeData");
    loadResume(); // Reload preview to show no data
});
// Load saved resume data on page load
loadResume();
