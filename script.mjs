import { getUserIDs } from "./data.mjs";

function populateUserDropdown() {
  const select = document.getElementById("user-select");

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- Select a user --";
  select.appendChild(defaultOption);

  for (const id of getUserIDs()) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    select.appendChild(option);
  }

  select.addEventListener("change", () => {
    displayUserData(select.value);
  });
}

window.addEventListener("DOMContentLoaded", populateUserDropdown);
