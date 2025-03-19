/**
 * Smooth Scroll Utility
 * 
 * Provides smooth scrolling functionality with navbar offset compensation
 * for different viewport sizes.
 */

interface ScrollOptions {
    /** Optional offset in pixels */
    offset?: number;
    /** Scroll behavior, defaults to 'smooth' */
    behavior?: ScrollBehavior;
}

/**
 * Smoothly scrolls to an element by ID
 * 
 * @param elementId - The ID of the target element
 * @param options - Optional configuration for scrolling behavior
 * @returns void
 * 
 * @example
 * ```ts
 * // Scroll to element with default options
 * smoothScroll('about');
 * 
 * // Scroll with custom offset
 * smoothScroll('projects', { offset: 100 });
 * ```
 */
export const smoothScroll = (elementId: string, options: ScrollOptions = {}) => {
    const element = document.getElementById(elementId);
    if (element) {
        const navbarHeight = window.innerWidth <= 768 ? 60 : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (options.offset || navbarHeight);

        window.scrollTo({
            top: offsetPosition,
            behavior: options.behavior || 'smooth'
        });
    }
};