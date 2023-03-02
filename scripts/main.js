const loadContent = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayContent(data.data);
};
const displayContent = (contents) => {
  const contentContainer = document.getElementById("content-container");
  contents.tools.forEach((content) => {
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
                <button onclick="loadContentDetails('${
                  content.id
                }')" class="border-0" data-bs-toggle="modal" data-bs-target="#contentModal"><i class="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
          </div>
        `;
    contentContainer.appendChild(contentDiv);
  });
};

const loadContentDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayContentDetails(data.data);
};
const displayContentDetails = (content) => {
  console.log(content.pricing);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
            <div
                class="d-flex justify-content-between align-items-center gap-3"
              >
                <div class="w-50 bg-info-subtle rounded border border-info p-2">
                  <h3>${content.description}</h3>
                  <div class="d-flex gap-3">
                    <div>
                      <h5 class="bg-light rounded text-success text-center p-2">
                        ${
                          content.pricing != null
                            ? content.pricing[0].price
                            : "Free of cost"
                        }
                        ${
                          content.pricing != null
                            ? content.pricing[0].plan
                            : "Basic"
                        }
                      </h5>
                    </div>
                    <div>
                      <h5 class="bg-light rounded text-danger-emphasis text-center p-2">
                        ${
                          content.pricing != null
                            ? content.pricing[1].price
                            : "Free of cost"
                        }
                        ${
                          content.pricing != null
                            ? content.pricing[1].plan
                            : "Pro"
                        }
                      </h5>
                    </div>
                    <div>
                      <h5 class="bg-light rounded text-danger text-center p-2">
                        ${
                          content.pricing != null
                            ? content.pricing[2].price
                            : "Free of cost"
                        }
                        ${
                          content.pricing != null
                            ? content.pricing[2].plan
                            : "Enterprise"
                        }
                      </h5>
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5>Features</h5>
                    </div>
                    <div>
                      <h5>Integrations</h5>
                    </div>
                  </div>
                </div>
                <div class="w-50 border border-secondary rounded p-2">
                  <div class="position-relative">
                    <img class="w-100" src="${content.image_link[0]}" alt="" />
                    <span
                      class="badge text-bg-danger position-absolute top-0 end-0"
                      >Accuracy</span
                    >
                  </div>
                  <h5>Question</h5>
                  <p>ans</p>
                </div>
            </div>
    `;
};
loadContent();
