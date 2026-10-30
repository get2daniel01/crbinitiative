const VALUES = [
  ['Integrity', 'We act honestly, ethically, and consistently in all that we do.'],
  ['Accountability', 'We take responsibility to beneficiaries, donors, partners, and each other.'],
  ['Respect', 'We uphold the dignity and rights of every person.'],
  ['Excellence', 'We pursue quality and continuous improvement in all our work.'],
  ['Inclusion', 'We value diversity and ensure that no one is left behind.'],
];

// Shared by the Home and About pages.
export default function Vision() {
  return (
    <section id="vision" className="alt">
      <div className="w">
        <div className="two">
          <div>
            <h2>Our vision</h2>
            <p style={{ font: "700 clamp(22px,2.6vw,30px)/1.25 'Bricolage Grotesque',sans-serif", margin: 0 }}>
              Dignified, resilient, and self-reliant communities across Nigeria.
            </p>
          </div>
          <div>
            <h2>Our mission</h2>
            <p style={{ fontSize: 19, margin: 0 }}>
              To deliver principled humanitarian action and catalyse sustainable development by empowering
              communities, strengthening systems, and partnering with those we serve.
            </p>
          </div>
        </div>
        <h2 style={{ marginTop: 64 }}>Our core values</h2>
        <p className="lead">Five values shape everything we do, including how we treat our staff.</p>
        <div className="rows">
          {VALUES.map(([title, text]) => (
            <div className="row" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
