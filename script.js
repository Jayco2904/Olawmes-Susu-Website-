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
  customerForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const status = document.querySelector('#customer-status');

    const fullName = customerForm.querySelector('[name="full_name"]').value.trim();
    const phone = customerForm.querySelector('[name="phone"]').value.trim();
    const address = customerForm.querySelector('[name="address"]').value.trim();

    status.textContent = 'Registering...';

    try {
      const response = await fetch(
        'https://yjgybbweymrengvysxfa.supabase.co/rest/v1/customers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'sb_publishable_5_oHI2mPQxy9yG5yYZM8og_HJbJZEnG',
            'Authorization': 'Bearer sb_publishable_5_oHI2mPQxy9yG5yYZM8og_HJbJZEnG',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            full_name: fullName,
            phone: phone,
            address: address
          })
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('Supabase error:', error);
        status.textContent = 'Registration failed: ' + error;
        return;
      }

      status.textContent =
        'Registration successful! Your customer account has been created.';

      customerForm.reset();

    } catch (error) {
      console.error('Connection error:', error);
      status.textContent = 'Registration failed: ' + error.message;
    }
  });
}
// Savings registration
const savingsForm = document.querySelector('#savings-form');

if (savingsForm) {
  savingsForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const status = document.querySelector('#savings-status');

    const customerId = savingsForm.querySelector('[name="customer_id"]').value;
    const amount = savingsForm.querySelector('[name="amount"]').value;
    const notes = savingsForm.querySelector('[name="notes"]').value.trim();

    status.textContent = 'Recording savings...';

    try {
      const response = await fetch(
        'https://yjgybbweymrengvysxfa.supabase.co/rest/v1/savings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'sb_publishable_5_oHI2mPQxy9yG5yYZM8og_HJbJZEnG',
            'Authorization': 'Bearer sb_publishable_5_oHI2mPQxy9yG5yYZM8og_HJbJZEnG',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            customer_id: Number(customerId),
            amount: Number(amount),
            notes: notes
          })
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('Supabase error:', error);
        status.textContent = 'Savings failed: ' + error;
        return;
      }

      status.textContent = 'Savings recorded successfully!';
      savingsForm.reset();

    } catch (error) {
      console.error('Connection error:', error);
      status.textContent = 'Savings failed: ' + error.message;
    }
  });
}
// Customer savings dashboard
const dashboardForm = document.querySelector('#dashboard-form');

if (dashboardForm) {
  dashboardForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const status = document.querySelector('#dashboard-status');
    const details = document.querySelector('#customer-details');

    const customerId = dashboardForm
      .querySelector('[name="customer_id"]')
      .value;

    status.textContent = 'Loading customer...';
    details.style.display = 'none';

    try {
      // Get customer
      const customerResponse = await fetch(
        `https://yjgybbweymrengvysxfa.supabase.co/rest/v1/customers?id=eq.${customerId}&select=id,full_name,phone`,
        {
          headers: {
            'apikey': 'sb_publishable_5_oHI2mPQxy9yG5yYZM8og_HJbJZEnG',
            'Authorization': 'Bearer sb_publishable_5_oHI2mPQxy9yG5yYZM8og_HJbJZEnG'
          }
        }
      );

      if (!customerResponse.ok) {
        throw new Error(await customerResponse.text());
      }

      const customers = await customerResponse.json();

      if (customers.length === 0) {
        status.textContent = 'Customer not found.';
        return;
      }

      const customer = customers[0];

      // Get savings
      const savingsResponse = await fetch(
        `https://yjgybbweymrengvysxfa.supabase.co/rest/v1/savings?customer_id=eq.${customerId}&select=amount,payment_date,notes&order=payment_date.desc`,
        {
          headers: {
            'apikey': 'sb_publishable_5_oHI2mPQxy9yG5yYZM8og_HJbJZEnG',
            'Authorization': 'Bearer sb_publishable_5_oHI2mPQxy9yG5yYZM8og_HJbJZEnG'
          }
        }
      );

      if (!savingsResponse.ok) {
        throw new Error(await savingsResponse.text());
      }

      const savings = await savingsResponse.json();

      const total = savings.reduce(
        (sum, item) => sum + Number(item.amount),
        0
      );

      document.querySelector('#dashboard-name').textContent =
        customer.full_name;

      document.querySelector('#dashboard-phone').textContent =
        'Phone: ' + customer.phone;

      document.querySelector('#dashboard-total').textContent =
        total.toFixed(2);

      const history = document.querySelector('#savings-history');

      if (savings.length === 0) {
        history.innerHTML = '<p>No savings recorded yet.</p>';
      } else {
        history.innerHTML = savings
          .map(item => `
            <div class="saving-record">
              <p><strong>₵${Number(item.amount).toFixed(2)}</strong></p>
              <p>${new Date(item.payment_date).toLocaleString()}</p>
              <p>${item.notes || ''}</p>
            </div>
          `)
          .join('');
      }

      details.style.display = 'block';
      status.textContent = '';

    } catch (error) {
      console.error('Dashboard error:', error);
      status.textContent = 'Could not load customer: ' + error.message;
    }
  });
}


