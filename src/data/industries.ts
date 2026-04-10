import slugs from './industry-slugs.json';

export interface Industry {
  dirName: string;
  slug: string;
  nameZh: string;
  nameEn: string;
  accent: string;
  description: string;
}

const meta: Record<string, Omit<Industry, 'dirName' | 'slug' | 'nameZh'>> = {
  electronics: {
    nameEn: 'Electronics ERP',
    accent: '#00E5FF',
    description: '電子供應鏈管理系統，涵蓋採購、庫存與生產排程',
  },
  food: {
    nameEn: 'FoodSafe ERP',
    accent: '#10B981',
    description: '食品安全與生產管理系統，追蹤批次、配方與合規',
  },
  logistics: {
    nameEn: 'Logistics ERP',
    accent: '#F59E0B',
    description: '物流與倉儲管理系統，即時追蹤配送與車隊調度',
  },
  metalwork: {
    nameEn: 'MetalForge ERP',
    accent: '#FF6B2C',
    description: '金屬加工製造系統，管理工單、模具與品質檢測',
  },
  textile: {
    nameEn: 'TextileWeave ERP',
    accent: '#6366F1',
    description: '紡織生產管理系統，控制織造、染整與出貨排程',
  },
  pharma: {
    nameEn: 'PharmaClear ERP',
    accent: '#14B8A6',
    description: '製藥生產管理系統，確保 GMP 合規與批次追溯',
  },
};

export const industries: Industry[] = slugs.map(({ dirName, slug }) => ({
  dirName,
  slug,
  nameZh: dirName,
  ...meta[slug],
}));
