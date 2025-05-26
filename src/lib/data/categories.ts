// src/lib/data/categories.ts
import { Category, CategoryNavItem } from '@/types/category';
import { Locale } from '@/types/common';

// Import your existing category data
// Adjust these imports based on your actual data structure
// import categoriesData from '@/data/categories';

// Mock data for now - replace with your actual data imports
const mockCategories: Category[] = [];

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 50));
  return [...mockCategories]; // Replace with your actual data
}

/**
 * Get active main categories for navigation
 */
export async function getMainCategories(): Promise<Category[]> {
  const categories = await getCategories();
  return categories.filter(cat => cat.isMainCategory && cat.isActive);
}

/**
 * Get a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find(cat => cat.slug === slug) || null;
}

/**
 * Get category navigation items (hierarchical structure)
 */
export async function getCategoryNavItems(locale: Locale): Promise<CategoryNavItem[]> {
  const categories = await getCategories();
  
  // Build hierarchical structure
  const navItems: CategoryNavItem[] = [];
  const categoryMap = new Map<string, CategoryNavItem>();
  
  // First pass: create nav items for all categories
  categories.forEach(cat => {
    const navItem: CategoryNavItem = {
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      icon: cat.icon,
      productCount: cat.productCount,
      children: [],
      isActive: cat.isActive,
      isFeatured: cat.isFeatured
    };
    categoryMap.set(cat.id, navItem);
  });
  
  // Second pass: build hierarchy
  categories.forEach(cat => {
    const navItem = categoryMap.get(cat.id)!;
    
    if (cat.parentId) {
      const parent = categoryMap.get(cat.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(navItem);
      }
    } else {
      // Root level category
      navItems.push(navItem);
    }
  });
  
  // Sort by sortOrder
  const sortCategories = (items: CategoryNavItem[]) => {
    items.sort((a, b) => {
      const catA = categories.find(c => c.id === a.id);
      const catB = categories.find(c => c.id === b.id);
      return (catA?.sortOrder || 0) - (catB?.sortOrder || 0);
    });
    
    items.forEach(item => {
      if (item.children && item.children.length > 0) {
        sortCategories(item.children);
      }
    });
  };
  
  sortCategories(navItems);
  
  return navItems;
}

/**
 * Get featured categories for homepage
 */
export async function getFeaturedCategories(limit: number = 6): Promise<Category[]> {
  const categories = await getCategories();
  return categories
    .filter(cat => cat.isFeatured && cat.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, limit);
}

/**
 * Get category with its children
 */
export async function getCategoryWithChildren(categoryId: string): Promise<{
  category: Category | null;
  children: Category[];
}> {
  const categories = await getCategories();
  const category = categories.find(cat => cat.id === categoryId) || null;
  
  if (!category) {
    return { category: null, children: [] };
  }
  
  const children = categories.filter(cat => cat.parentId === categoryId);
  
  return { category, children };
}

/**
 * Get category breadcrumbs
 */
export async function getCategoryBreadcrumbs(categorySlug: string, locale: Locale): Promise<{
  id: string;
  slug: string;
  name: string;
}[]> {
  const categories = await getCategories();
  const category = categories.find(cat => cat.slug === categorySlug);
  
  if (!category) return [];
  
  const breadcrumbs: { id: string; slug: string; name: string }[] = [];
  let currentCategory: Category | undefined = category;
  
  // Build breadcrumb path from current to root
  while (currentCategory) {
    breadcrumbs.unshift({
      id: currentCategory.id,
      slug: currentCategory.slug,
      name: currentCategory.name[locale]
    });
    
    if (currentCategory.parentId) {
      currentCategory = categories.find(cat => cat.id === currentCategory!.parentId);
    } else {
      currentCategory = undefined;
    }
  }
  
  return breadcrumbs;
}

/**
 * Get popular brands for a category
 */
export async function getCategoryBrands(categorySlug: string): Promise<string[]> {
  const category = await getCategoryBySlug(categorySlug);
  return category?.popularBrands || [];
}

/**
 * Search categories
 */
export async function searchCategories(query: string, locale: Locale): Promise<Category[]> {
  const categories = await getCategories();
  const searchTerm = query.toLowerCase();
  
  return categories.filter(cat => 
    cat.name[locale].toLowerCase().includes(searchTerm) ||
    cat.description[locale].toLowerCase().includes(searchTerm) ||
    cat.slug.includes(searchTerm)
  );
}