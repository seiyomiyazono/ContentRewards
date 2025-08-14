import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectDetail } from '../types';
import { getProjectDetail } from '../data/mockData';

export const useProjectDetail = (id: string | undefined) => {
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      if (id) {
        const projectDetail = getProjectDetail(id);
        if (projectDetail) {
          setProject(projectDetail);
        } else {
          navigate('/404');
          return;
        }
      }
      setLoading(false);
    }, Math.random() * 200 + 400); // 400-600ms

    return () => clearTimeout(timer);
  }, [id, navigate]);

  return { project, loading };
};