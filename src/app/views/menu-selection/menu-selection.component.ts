import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuOption, MenuSection } from "../../interfaces/menu";
import { WeeklyCalendarComponent } from "../../components/weekly-calendar/weekly-calendar.component";

@Component({
  selector: "app-menu-selection",
  templateUrl: "./menu-selection.component.html",
  styleUrls: ["./menu-selection.component.css"],
  standalone: true,
  imports: [CommonModule, WeeklyCalendarComponent],
})
export default class MenuSelectionComponent {
  menuTypes = [
    { name: "Primer Plato + Postre", selected: false },
    { name: "Segundo Plato + Postre", selected: false },
    { name: "Menú Completo", selected: true },
  ];

  // Debe cojer los datos de la API/Imagen
  menuSections: MenuSection[] = [
    {
      title: "Primer Plato",
      options: [
        { name: "Sopa de Verduras", selected: false },
        { name: "Ensalada Mixta", selected: false },
      ],
    },
    {
      title: "Segundo Plato",
      options: [
        { name: "Pollo al Horno", selected: false },
        { name: "Pescado a la Plancha", selected: false },
      ],
    },
    {
      title: "Postre",
      options: [
        { name: "Fruta del Tiempo", selected: false },
        { name: "Yogur Natural", selected: false },
      ],
    },
  ];

  taperSelected = false;

  selectMenuType(index: number): void {
    this.menuTypes.forEach((type, i) => (type.selected = i === index));
  }

  selectOption(sectionIndex: number, optionIndex: number): void {
    this.menuSections[sectionIndex].options.forEach((option, index) => {
      option.selected = index === optionIndex ? !option.selected : false;
    });
  }

  toggleTaper(): void {
    this.taperSelected = !this.taperSelected;
  }  

  confirmSelection(): void {
    const selectedMenuType = this.menuTypes.find((type) => type.selected)?.name;
    const selectedOptions = this.menuSections.map((section) => {
      const selected = section.options.find((option) => option.selected);
      return selected ? selected.name : "None";
    });

    console.log("Menú seleccionat:", selectedMenuType);
    console.log("Plats seleccionats:", selectedOptions);
    console.log("Portarà tàper:", this.taperSelected);
  }
}
