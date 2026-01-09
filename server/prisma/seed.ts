import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.product.deleteMany();

  // Seed products
  const products = [
    {
      name: "1С Бухгалтерия",
      price: 4400,
      image: "/img/1c-accounting.jpg",
      description:
        "Полный контроль финансовой деятельности компании: от операций с денежными средствами до расчета налогов и сдачи регламентированной отчетности.",
      category: "Программное обеспечение",
      variants: ["Базовая", "ПРОФ", "КРОП"],
      benefits: [
        "Строгое соответствие законодательству",
        "Подходит юрлицам на УСН, ПСН, ОСНО",
      ],
      features: [
        "Учет и отчетность",
        "Управление финансовыми ресурсами",
        "Работа с контрагентами",
        "Производственный учет",
      ],
    },
    {
      name: "Рулонная трава Eco Lawn",
      price: 250,
      image: "/img/grass-roll-1.jpg",
      description: "Высококачественная рулонная трава для вашего газона",
      category: "Рулонная трава",
      variants: [],
      benefits: ["Быстрая укладка", "Готов к использованию через 2-3 недели"],
      features: ["Устойчивость к засухе", "Морозостойкость"],
    },
    {
      name: "Рулонная трава Premium Green",
      price: 350,
      image: "/img/grass-roll-2.jpg",
      description: "Премиум рулонная трава повышенной устойчивости",
      category: "Рулонная трава",
      variants: [],
      benefits: ["Премиум качество", "Повышенная плотность"],
      features: ["Устойчивость к вытаптыванию", "Яркий насыщенный цвет"],
    },
    {
      name: "Газонная трава Универсальная",
      price: 180,
      image: "/img/grass-seed-1.jpg",
      description: "Семена газонной травы для любого типа почвы",
      category: "Семена газонной травы",
      variants: [],
      benefits: ["Подходит для любой почвы", "Быстрая всхожесть"],
      features: ["Универсальное применение", "Неприхотливость в уходе"],
    },
    {
      name: "Газонная трава Спортивная",
      price: 220,
      image: "/img/grass-seed-2.jpg",
      description: "Устойчивая к вытаптыванию газонная трава",
      category: "Семена газонной травы",
      variants: [],
      benefits: ["Высокая износостойкость", "Быстрое восстановление"],
      features: ["Для спортивных площадок", "Плотный дерн"],
    },
    {
      name: "Плодородный грунт",
      price: 500,
      image: "/img/soil-1.jpg",
      description: "Качественный плодородный грунт для газонов",
      category: "Грунт",
      variants: [],
      benefits: [
        "Высокое содержание питательных веществ",
        "Оптимальная структура",
      ],
      features: ["Улучшение плодородия", "Универсальное применение"],
    },
    {
      name: "Торф верховой",
      price: 450,
      image: "/img/soil-2.jpg",
      description: "Верховой торф для улучшения структуры почвы",
      category: "Грунт",
      variants: [],
      benefits: ["Улучшает структуру почвы", "Повышает влагоемкость"],
      features: ["Натуральный продукт", "Экологически чистый"],
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
