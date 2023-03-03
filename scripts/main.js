// Loaded Data From API

const loadContent = async (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayContent(dataLimit, data.data.tools);
};

// Displayed Data in UI

const displayContent = (dataLimit, contents) => {
  const contentContainer = document.getElementById("content-container");
  contentContainer.innerHTML = "";
  // Content Slice
  const showAll = document.getElementById("see-all");
  if (dataLimit) {
    contents = contents.slice(0, 6);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  contents.forEach((content) => {
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
                 ${content.features[0] ? `1. ${content.features[0]}` : ""}
                    </p>
                    <p>
                 ${content.features[1] ? `2. ${content.features[1]}` : ""}
                    </p>
                    <p>
                 ${content.features[2] ? `3. ${content.features[2]}` : ""}
                    </p>
                    <p>
                 ${content.features[3] ? `4. ${content.features[3]}` : ""}
                    </p>
                    <p>
                 ${content.features[4] ? `5. ${content.features[4]}` : ""}
                    </p>
                    <p>
                 ${content.features[5] ? `6. ${content.features[5]}` : ""}
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

// Loaded Data of single contents from API by ID

const loadContentDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayContentDetails(data.data);
};

// Displayed Data of single contents from API by ID

const displayContentDetails = (content) => {
  console.log(content.features["2"].feature_name);
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
            <div
                class="d-flex justify-content-between align-items-center gap-3"
              >
                <div class="w-50 bg-info-subtle rounded border border-info p-2">
                  <h3>${content.description}</h3>
                  <div class="d-flex justify-content-between align-items-center gap-1 ">
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
                      ${
                        content.features != null
                          ? `<p>
                 ${
                   content.features["0"]
                     ? content.features["0"].feature_name
                     : ""
                 }
                    </p>
                    <p>
                 ${
                   content.features["1"]
                     ? content.features["1"].feature_name
                     : ""
                 }
                    </p>
                    <p>
                 ${
                   content.features["2"]
                     ? content.features["2"].feature_name
                     : ""
                 }
                    </p>
                    <p>
                 ${
                   content.features["3"]
                     ? content.features["3"].feature_name
                     : ""
                 }
                    </p>
                    <p>
                 ${
                   content.features["4"]
                     ? content.features["4"].feature_name
                     : ""
                 }
                    </p>
                    <p>
                 ${
                   content.features["5"]
                     ? content.features["5"].feature_name
                     : ""
                 }
                    </p>`
                          : "No Data Found"
                      }
                    </div>
                    <div>
                      <h5>Integrations</h5>
                      ${
                        content.integrations != null
                          ? `
                      <p>
                 ${content.integrations[0] ? content.integrations[0] : ""}
                    </p>
                    <p>
                 ${content.integrations[1] ? content.integrations[1] : ""}
                    </p>
                    <p>
                 ${content.integrations[2] ? content.integrations[2] : ""}
                    </p>
                    <p>
                 ${content.integrations[3] ? content.integrations[3] : ""}
                    </p>
                      `
                          : "No Data Found"
                      }
                    </div>
                  </div>
                </div>
                <div class="w-50 border border-secondary rounded p-2">
                  <div class="position-relative">
                    <img class="w-100" src="${content.image_link[0]}" alt="" />
                    <span
                      class="badge text-bg-danger position-absolute top-0 end-0"
                      >${
                        content.accuracy.score != null
                          ? `Accuracy ${content.accuracy.score}`
                          : ""
                      }</span
                    >
                  </div>
                  <h5>${
                    content.input_output_examples != null &&
                    content.input_output_examples[0].input
                      ? content.input_output_examples[0].input
                      : "No Result Found"
                  }</h5>
                  <p>${
                    content.input_output_examples != null &&
                    content.input_output_examples[0].output
                      ? content.input_output_examples[0].output
                      : "No Result Found"
                  }</p>
                </div>
            </div>
    `;
};

// Loader

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// See All Button

const seeAll = document
  .getElementById("see-all")
  .addEventListener("click", function () {
    loadContent();
  });

loadContent(6);
