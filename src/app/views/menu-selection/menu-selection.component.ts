import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MenuOption, MenuSection } from '../../interfaces/menu';
import { WeeklyCalendarComponent } from '../../components/weekly-calendar/weekly-calendar.component';
import { API_CONFIG } from '../../environments/api.config';

@Component({
  selector: 'app-menu-selection',
  templateUrl: './menu-selection.component.html',
  styleUrls: ['./menu-selection.component.css'],
  standalone: true,
  imports: [CommonModule, WeeklyCalendarComponent],
})
export default class MenuSelectionComponent implements OnInit {
  menuTypes = [
    { name: 'Primer Plato + Postre', selected: false },
    { name: 'Segundo Plato + Postre', selected: false },
    { name: 'Menú Completo', selected: false },
  ];

  menuSections: MenuSection[] = [];

  taperSelected = false;
  selectedDate: Date = new Date(); // default to today

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMenuFromBackend();
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.loadMenuFromBackend();
  }

  loadMenuFromBackend(): void {
    if (!this.selectedDate) return;

    const formattedDate = this.selectedDate.toISOString().split('T')[0]; // yyyy-mm-dd
    const url = `${API_CONFIG.baseUrl}/menus/${formattedDate}`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        const dishes = response.data?.dishes || [];
        this.menuSections = [];

        const grouped: Record<number, MenuOption[]> = {};
        dishes.forEach((dish: any) => {
          const options = JSON.parse(dish.options || '[]') as string[];
          if (!grouped[dish.dish_type_id]) grouped[dish.dish_type_id] = [];
          grouped[dish.dish_type_id].push(
            ...options.map((name) => ({ name, selected: false }))
          );
        });

        const typeMap: Record<number, string> = {
          1: 'Primer Plato',
          2: 'Segundo Plato',
          3: 'Postre',
        };

        this.menuSections = Object.entries(grouped).map(
          ([typeId, options]) => ({
            title: typeMap[+typeId] || `Tipo ${typeId}`,
            options,
          })
        );
      },
      error: (err) => {
        console.error('Error loading menu:', err);
        this.menuSections = [];
      },
    });
  }

  selectMenuType(index: number): void {
    this.menuTypes.forEach((type, i) => (type.selected = i === index));
  }

  selectOption(sectionIndex: number, optionIndex: number): void {
    const option = this.menuSections[sectionIndex].options[optionIndex];
    option.selected = !option.selected;

    if (option.selected) {
      this.menuSections[sectionIndex].options.forEach((opt, i) => {
        if (i !== optionIndex) opt.selected = false;
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
      return selected ? selected.name : 'None';
    });

    console.log('Menú seleccionado:', selectedMenuType);
    console.log('Platos seleccionados:', selectedOptions);
    console.log('Traerá táper:', this.taperSelected);
  }

  hasSelectedMenuType(): boolean {
    return this.menuTypes.some((type) => type.selected);
  }

  getActualIndex(title: string): number {
    return this.menuSections.findIndex((section) => section.title === title);
  }

  filteredMenuSections(): MenuSection[] {
    const selected = this.menuTypes.find((type) => type.selected)?.name;

    switch (selected) {
      case 'Primer Plato + Postre':
        return this.menuSections.filter(
          (section) =>
            section.title === 'Primer Plato' || section.title === 'Postre'
        );
      case 'Segundo Plato + Postre':
        return this.menuSections.filter(
          (section) =>
            section.title === 'Segundo Plato' || section.title === 'Postre'
        );
      case 'Menú Completo':
        return this.menuSections;
      default:
        return [];
    }
  }
}
