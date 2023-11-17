import { SearchInput } from "@/components/search-input";
import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import prismadb from "@/lib/prismadb";

interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  }
}

const RootPage = async ({
  searchParams  
}: RootPageProps) => {
  const data = await prismadb.companion.findMany({
    // This Prisma query is used to find many records in the 'companion' table in the database.
    // The 'where' clause filters the records based on the 'categoryId' and 'name' from 'searchParams'.
    // The 'orderBy' clause sorts the records in descending order based on their 'createdAt' timestamp.
    // The 'include' clause includes the count of 'messages' related to each 'companion' record.
    // We set this up in the schema file that messages is a relational property of Companion
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      }
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true
        }
      }
    }
  })

  const categories = await prismadb.category.findMany();

  return (
    <div>
      <div className="h-full p-4 space-y-2">
        <SearchInput />
        <Categories data={categories} />
        <Companions data={data} />
      </div>
    </div>
  );
}
 
export default RootPage;