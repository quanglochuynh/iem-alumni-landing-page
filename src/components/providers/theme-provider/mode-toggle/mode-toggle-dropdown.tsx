import {
  Theme,
  themeOptions,
} from '@/components/providers/theme-provider/theme.helper';
import { useTheme } from '@/components/providers/theme-provider/theme.hook';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check } from 'lucide-react';

type Props = {
  renderButton: (theme: Theme) => React.ReactNode;
};

export default function ModeToggleDropdown({ renderButton }: Props) {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{renderButton(theme)}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map(({ name, icon: Icon, label }) => (
          <DropdownMenuItem
            key={name}
            onClick={() => setTheme(name)}
            className={theme !== name ? 'text-primary' : 'text-gray-500'}
            disabled={theme === name}
          >
            {theme === name ? <Check size={16} /> : <Icon size={16} />}
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
