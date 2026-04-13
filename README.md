# Workshop Booking

A Django app for managing FOSSEE workshops. Coordinators can book workshops and view statistics. Instructors manage bookings and handle requests.

## What I Noticed

The original app worked fine but looked pretty basic. Forms and pages didn't adapt well to phones. The design felt outdated. Navigation was the same on all screen sizes.

## What I Changed

- Added a light/dark theme system that you can toggle in the top bar
- Made everything responsive so it works on phones, tablets, and desktops
- Fixed the layout so tables and forms look good on small screens
- Improved the overall look with better spacing and colors
- Made buttons and inputs bigger and easier to tap on mobile
- Updated forms to be clearer and easier to use
- Fixed the login page and statistics pages to display properly

## Trade-offs

I chose to use CSS variables and localStorage for the theme system instead of storing it in the database. This means:

Good:
- Theme switches instantly without page reload
- Works offline
- No database calls needed

Not so good:
- Theme preference doesn't sync across different devices
- Only works in one browser

For responsive design, I wrote custom CSS instead of using a framework like Bootstrap. This gives me full control but means more CSS code to maintain.

## Challenges

**Challenge 1: Making the theme switch instantly**
The issue was that changing themes requires updating a lot of colors everywhere. I solved this by using CSS variables - when you click the theme button, it just changes which variable values are active, so everything updates at once.

**Challenge 2: Making forms work on tiny phone screens**
Tables and forms designed for desktop don't fit on phones. I had to reflow them - making tables scroll horizontally on mobile, and stacking form fields vertically instead of side-by-side.

**Challenge 3: Dark mode and contrast**
Dark backgrounds look cool but make it hard to read text if you don't pick the right colors. I had to check contrast ratios carefully and pick colors that work in both light and dark modes.

## How to Run

1. Clone the repo:
```bash
git clone https://github.com/FOSSEE/workshop_booking.git
cd workshop_booking
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate        # On Mac/Linux
# or
venv\Scripts\activate           # On Windows
```

3. Install requirements:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser:
```bash
python manage.py createsuperuser
```

6. Start the server:
```bash
python manage.py runserver 8000
```

7. Open http://localhost:8000

You can log in with the superuser account and see all the updated pages. Try clicking the theme toggle in the top bar to switch between light and dark mode.

## Screenshots

(Add before and after screenshots here)
