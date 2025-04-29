import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AlertNotification from '../../components/Alert';
import { act } from '@testing-library/react';

describe('AlertNotification Component', () => {
    const mockSetSnackbarOpen = jest.fn();

    it('renders the Snackbar when snackbarOpen is true', () => {
        render(
            <AlertNotification
                snackbarOpen={true}
                setSnackbarOpen={mockSetSnackbarOpen}
                snackbarMessage="Test message"
            />
        );

        expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('does not render the Snackbar when snackbarOpen is false', () => {
        render(
            <AlertNotification
                snackbarOpen={false}
                setSnackbarOpen={mockSetSnackbarOpen}
                snackbarMessage="Test message"
            />
        );

        expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    });

    it('closes the Snackbar when the close button is clicked', () => {
        render(
            <AlertNotification
                snackbarOpen={true}
                setSnackbarOpen={mockSetSnackbarOpen}
                snackbarMessage="Test message"
            />
        );

        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);

        expect(mockSetSnackbarOpen).toHaveBeenCalledWith(false);
    });
    
    it('closes the Snackbar automatically after the autoHideDuration', () => {
        jest.useFakeTimers();
      
        render(
          <AlertNotification
            snackbarOpen={true}
            setSnackbarOpen={mockSetSnackbarOpen}
            snackbarMessage="Test message"
          />
        );
      
        act(() => {
          jest.advanceTimersByTime(5000);
        });
      
        expect(mockSetSnackbarOpen).toHaveBeenCalledWith(false);
      
        jest.useRealTimers();
      });
});