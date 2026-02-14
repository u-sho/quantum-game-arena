type Theme = 'light' | 'dark' | 'auto';

class ThemeStore {
	theme = $state<Theme>('auto');

	setTheme(newTheme: Theme): void {
		this.theme = newTheme;
	}

	toggleTheme(): void {
		if (this.theme === 'light') {
			this.setTheme('dark');
		} else if (this.theme === 'dark') {
			this.setTheme('auto');
		} else {
			this.setTheme('light');
		}
	}
}

export const themeStore = new ThemeStore();
