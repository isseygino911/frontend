import { useCallback, useEffect, useRef, useState } from 'react';
import { getProjects } from '../services/projectsAPI.js';
import { useLabMotion } from '../hooks/useLabMotion.js';
import LabHeader from '../components/lab/LabHeader.jsx';
import LabHero from '../components/lab/LabHero.jsx';
import LabComposition from '../components/lab/LabComposition.jsx';
import LabSlider from '../components/lab/LabSlider.jsx';
import LabDelivery from '../components/lab/LabDelivery.jsx';
import LabApproach from '../components/lab/LabApproach.jsx';
import LabMarquee from '../components/lab/LabMarquee.jsx';
import LabCards from '../components/lab/LabCards.jsx';
import LabQuote from '../components/lab/LabQuote.jsx';
import LabAccordion from '../components/lab/LabAccordion.jsx';
import LabFooter from '../components/lab/LabFooter.jsx';
import '../styles/lab.css';

/**
 * / — landing page rebuilt on the structure and scroll choreography of the
 * stanzza.design awards page, filled with II Design's own projects and copy.
 * Plan: docs/plans/stanzza-landing.md
 */
export default function Lab() {
  const rootRef = useRef(null);
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState(false);

  const load = useCallback(() => {
    setError(false);
    setProjects(null);
    getProjects()
      .then(setProjects)
      .catch((err) => {
        console.error('[lab] Failed to load projects', err);
        setError(true);
      });
  }, []);

  useEffect(load, [load]);

  const ready = Array.isArray(projects) && projects.length > 0;
  useLabMotion(rootRef, ready);

  return (
    <div id="page-lab" ref={rootRef}>
      <LabHeader />
      <main aria-label="II Design landing">
        <LabHero />

        {!projects && !error && (
          <p className="lab-state" role="status">Loading projects…</p>
        )}
        {error && (
          <div className="lab-state" role="alert">
            <p>Projects could not be loaded.</p>
            <button type="button" className="lab-btn lab-btn-light" onClick={load}>Try again</button>
          </div>
        )}
        {projects && projects.length === 0 && (
          <p className="lab-state">No projects to show yet.</p>
        )}

        {ready && (
          <>
            <LabComposition projects={projects} />
            <LabSlider projects={projects} />
            <LabDelivery />
            <LabApproach projects={projects} />
            <LabMarquee projects={projects} />
            <LabCards projects={projects} />
            <LabQuote />
            <LabAccordion projects={projects} />
          </>
        )}
      </main>
      <LabFooter />
    </div>
  );
}
