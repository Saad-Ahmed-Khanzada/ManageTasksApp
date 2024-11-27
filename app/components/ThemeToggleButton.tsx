import React, { useContext } from 'react';
import { Button, View, Text } from 'react-native';
import { ThemeContext } from '@/contexts/ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const { theme, toggleTheme, colors } = themeContext;

  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: colors.text, marginBottom: 10 }}>
        Current Theme: {theme.toUpperCase()}
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} color={colors.primary} />
    </View>
  );
};

export default ThemeToggleButton;
