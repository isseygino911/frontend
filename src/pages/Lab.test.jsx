import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PROJECTS } from '../data/projects.js';
import { getProjects } from '../services/projectsAPI.js';
import Lab from './Lab.jsx';

vi.mock('../services/projectsAPI.js', () => ({ getProjects: vi.fn() }));

function renderLab() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Lab />
    </MemoryRouter>
  );
}

async function renderLoaded() {
  getProjects.mockResolvedValue(PROJECTS);
  renderLab();
  await screen.findByRole('region', { name: 'Selected projects' });
}

beforeEach(() => {
  getProjects.mockReset();
});

describe('Lab page states', () => {
  it('shows a loading status while projects load', () => {
    getProjects.mockReturnValue(new Promise(() => {}));
    renderLab();
    expect(screen.getByRole('status')).toHaveTextContent('Loading projects…');
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('shows an error with a retry that refetches', async () => {
    getProjects.mockRejectedValueOnce(new Error('down')).mockResolvedValueOnce(PROJECTS);
    renderLab();
    expect(await screen.findByRole('alert')).toHaveTextContent('Projects could not be loaded.');
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByRole('region', { name: 'Selected projects' })).toBeInTheDocument();
    expect(getProjects).toHaveBeenCalledTimes(2);
  });

  it('shows an empty message when there are no projects', async () => {
    getProjects.mockResolvedValue([]);
    renderLab();
    expect(await screen.findByText('No projects to show yet.')).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Selected projects' })).not.toBeInTheDocument();
  });
});

describe('Lab page content', () => {
  it('renders the landmark, hero heading and every section', async () => {
    await renderLoaded();
    expect(screen.getByRole('main', { name: 'II Design landing' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Interiors shaped around people,' })).toBeInTheDocument();
    [
      'Composition',
      'Selected projects',
      'How we work',
      'Manifesto',
      'Portfolio in numbers',
      'Project index',
      'Office projects',
      'Studio',
      'Projects A–Z',
    ].forEach((name) => expect(screen.getByRole('region', { name })).toBeInTheDocument());
  });

  it('derives the stats from the project data', async () => {
    await renderLoaded();
    const stats = within(screen.getByRole('region', { name: 'Portfolio in numbers' }));
    const hotels = PROJECTS.filter((p) => p.type === 'Hotel').length;
    const offices = PROJECTS.filter((p) => p.type === 'Office').length;
    const locations = new Set(PROJECTS.map((p) => p.location)).size;
    expect(stats.getByText('Projects').closest('li')).toHaveTextContent(String(PROJECTS.length));
    expect(stats.getByText('Hotels').closest('li')).toHaveTextContent(String(hotels));
    expect(stats.getByText('Offices').closest('li')).toHaveTextContent(String(offices));
    expect(stats.getByText('Locations').closest('li')).toHaveTextContent(String(locations));
  });

  it('shows real project titles and links in the slider', async () => {
    await renderLoaded();
    const slider = within(screen.getByRole('region', { name: 'Selected projects' }));
    expect(slider.getByRole('heading', { name: 'West Lake State Guesthouse' })).toBeInTheDocument();
    expect(slider.getAllByRole('link', { name: 'View Project' })[0]).toHaveAttribute('href', '/project/west-lake-state-guesthouse');
    expect(slider.getByRole('link', { name: 'View All Projects' })).toHaveAttribute('href', '/archive');
  });

  it('lists office projects as cards', async () => {
    await renderLoaded();
    const cards = within(screen.getByRole('region', { name: 'Office projects' }));
    const firstOffice = PROJECTS.find((p) => p.type === 'Office');
    expect(cards.getByRole('heading', { name: firstOffice.title })).toBeInTheDocument();
    expect(cards.getAllByRole('article')).toHaveLength(4);
  });

  it('links the footer call to action to the contact page', async () => {
    await renderLoaded();
    const links = screen.getAllByRole('link', { name: 'Start a Project' });
    links.forEach((link) => expect(link).toHaveAttribute('href', '/contact'));
  });
});

describe('Lab page interactions', () => {
  it('steps the slider with next and previous', async () => {
    await renderLoaded();
    const slider = within(screen.getByRole('region', { name: 'Selected projects' }));
    expect(slider.getByText('01 / 05')).toBeInTheDocument();
    fireEvent.click(slider.getByRole('button', { name: 'Next project' }));
    expect(slider.getByText('02 / 05')).toBeInTheDocument();
    fireEvent.click(slider.getByRole('button', { name: 'Previous project' }));
    fireEvent.click(slider.getByRole('button', { name: 'Previous project' }));
    expect(slider.getByText('05 / 05')).toBeInTheDocument();
  });

  it('toggles accordion items and reveals more on demand', async () => {
    await renderLoaded();
    const index = within(screen.getByRole('region', { name: 'Projects A–Z' }));
    const triggers = index.getAllByRole('button', { expanded: false });
    expect(triggers).toHaveLength(4);
    fireEvent.click(triggers[0]);
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(triggers[0]);
    expect(triggers[0]).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(index.getByRole('button', { name: 'Show more' }));
    await waitFor(() => expect(index.getAllByRole('button', { expanded: false })).toHaveLength(PROJECTS.length));
    expect(index.queryByRole('button', { name: 'Show more' })).not.toBeInTheDocument();
  });

  it('opens and closes the menu', async () => {
    await renderLoaded();
    const menu = screen.getByRole('button', { name: 'Menu' });
    expect(menu).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(menu);
    expect(menu).toHaveAttribute('aria-expanded', 'true');
    const nav = screen.getByRole('navigation', { name: 'Site' });
    expect(within(nav).getByRole('link', { name: 'Archive' })).toHaveAttribute('href', '/archive');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(menu).toHaveAttribute('aria-expanded', 'false');
  });
});
