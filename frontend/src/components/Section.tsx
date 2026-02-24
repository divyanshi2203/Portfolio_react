import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} style={{ marginTop: 24 }}>
      <div className="card">
        <div className="cardInner">
          <h2 className="sectionTitle">{title}</h2>
          {subtitle ? <p className="sectionHint">{subtitle}</p> : null}
          <hr className="hr" />
          {children}
        </div>
      </div>
    </section>
  );
}