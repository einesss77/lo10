import * as React from 'react';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

interface AppThemeProps {
    children: React.ReactNode;
    disableCustomTheme?: boolean;
    themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
    const { children, disableCustomTheme, themeComponents } = props;

    const theme = React.useMemo(() => {
        return disableCustomTheme
            ? createTheme()
            : createTheme({
                typography,
                shadows,
                shape,
                components: {
                    ...inputsCustomizations,
                    ...dataDisplayCustomizations,
                    ...feedbackCustomizations,
                    ...surfacesCustomizations,
                    ...themeComponents,
                },
            });
    }, [disableCustomTheme, themeComponents]);

    if (disableCustomTheme) {
        return <>{children}</>;
    }

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
