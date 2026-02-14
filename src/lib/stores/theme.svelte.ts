type Theme = 'light' | 'dark' | 'auto';

class ThemeStore {
	theme = $state<Theme>('auto');

	setTheme(newTheme: Theme) {
		this.theme = newTheme;
	}

	toggleTheme() {
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
