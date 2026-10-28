import { MonitorCog, Sun } from 'lucide-react';
import ModeToggleDropdown from '@/components/providers/theme-provider/mode-toggle/mode-toggle-dropdown';
import { Button, type ButtonProps } from '@/components/ui/button';

export default function ModeToggleButton({ ...props }: ButtonProps) {
  return (
    <ModeToggleDropdown
      renderButton={(theme) => (
        <Button size="icon" description="Chế độ giao diện" {...props}>
          {theme === 'light' ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <MonitorCog className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      )}
    />
  );
}
