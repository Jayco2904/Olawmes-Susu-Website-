const SUPABASE_URL = "https://yjgybbweymrengvysxfa.supabase.co";
const SUPABASE_KEY = "sb_publishable_5_oHI2mPQxy9yG5yYZM8og_HJbJZEnG";

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('#nav-links');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('#nav-links a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('open'));
});

// Footer year
document.querySelector('#year').textContent = new Date().getFullYear();

// Contact form
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = contactForm.querySelector('[name="name"]').value.trim();
  const phone = contactForm.querySelector('[name="phone"]').value.trim();
  const message = contactForm.querySelector('[name="message"]').value.trim();

  formStatus.textContent = 'Sending...';

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/contact_messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          message: message
        })
      }
    );

    if (!response.ok) {
      throw new Error('Message could not be saved.');
    }

    formStatus.textContent =
      'Thank you! Your message has been received. We will contact you soon.';

    contactForm.reset();

  } catch (error) {
    console.error(error);

    formStatus.textContent =
      'Sorry, your message could not be sent. Please try again.';
  }
});
// Customer registration
const customerForm = document.querySelector('#customer-form');

if (customerForm) {
  customerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const status = document.querySelector('#customer-status');
    const formData = new FormData(customerForm);

    const customer = {
      full_name: formData.get('full_name'),
      phone: formData.get('phone'),
      address: formData.get('address')
    };

    status.textContent = 'Registering...';

    try {
      const response = await fetch(
        'https://yjgybbweymrengvysxfa.supabase.co/rest/v1/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'YOUR_SUPABASE_PUBLISHABLE_KEY',
            'Authorization': 'Bearer YOUR_SUPABASE_PUBLISHABLE_KEY',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(customer)
        }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      status.textContent =
        'Registration successful! Your customer account has been created.';
      customerForm.reset();

    } catch (error) {
      console.error(error);
      status.textContent =
        'Registration failed. Please try again.';
    }
  });
}
