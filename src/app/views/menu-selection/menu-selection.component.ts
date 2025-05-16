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
    { name: "Menú Completo", selected: false }, // ahora ninguno preseleccionado
  ];

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

  // Toggle selección para menuTypes
selectMenuType(index: number): void {
  // Solo selecciona la opción clicada, deseleccionando las demás
  this.menuTypes.forEach((type, i) => (type.selected = i === index));
}

  // Toggle selección para las opciones de menú
  selectOption(sectionIndex: number, optionIndex: number): void {
    const option = this.menuSections[sectionIndex].options[optionIndex];
    if (option.selected) {
      option.selected = false;
    } else {
      this.menuSections[sectionIndex].options.forEach((opt, i) => {
        opt.selected = i === optionIndex;
      });
    }
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

  // Comprueba si hay una opción de tipo de menú seleccionada
hasSelectedMenuType(): boolean {
  return this.menuTypes.some((type) => type.selected);
}

// Devuelve el índice real según el título de la sección
getActualIndex(title: string): number {
  return this.menuSections.findIndex(section => section.title === title);
}

// Filtra las secciones visibles según la opción seleccionada
filteredMenuSections(): MenuSection[] {
  const selected = this.menuTypes.find((type) => type.selected)?.name;

  switch (selected) {
    case "Primer Plato + Postre":
      return [this.menuSections[0], this.menuSections[2]];
    case "Segundo Plato + Postre":
      return [this.menuSections[1], this.menuSections[2]];
    case "Menú Completo":
      return this.menuSections;
    default:
      return [];
  }
}

}
