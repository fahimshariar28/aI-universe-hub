const loadContent = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayContent(data.data);
};
const displayContent = (contents) => {
  const contentContainer = document.getElementById("content-container");
  contents.tools.forEach((content) => {
    console.log(contents.tools);
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("col");
    contentDiv.innerHTML = `
        <div class="card p-3 h-100">
            <img src="${content.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${content.name}</h5>
              <p class="card-text">
              Features
                    <p>
                 ${content.features[0] ? content.features[0] : ""}
                    </p>
                    <p>
                 ${content.features[1] ? content.features[1] : ""}
                    </p>
                    <p>
                 ${content.features[2] ? content.features[2] : ""}
                    </p>
                    <p>
                 ${content.features[3] ? content.features[3] : ""}
                    </p>
              </p>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
              <div>
                 <h6 class="card-title">${content.name}</h6>   
              <p class="text-muted"><i class="fa-solid fa-calendar-days">  ${
                content.published_in
              }</i></p>
              </div>
              <div>
                <button class="border-0"><i class="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
          </div>
        `;
    contentContainer.appendChild(contentDiv);
  });
};
loadContent();
