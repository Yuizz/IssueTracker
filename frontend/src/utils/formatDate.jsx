export function formatDate(d) {
    const date = new Date(d);
    const formattedDate = Intl.DateTimeFormat('es-MX',{
        // year: 'numeric',
        month: 'short',
        day: '2-digit' }).format(date);

    return formattedDate
}

// Output in M d, Y format