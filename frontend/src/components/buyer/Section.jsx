import React from "react";
import { Card, CardContent } from "../ui/card";

const Section = ({ categoriesWithIcon, handleNavigateToListingPage }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
      {categoriesWithIcon.map((categoryItem) => (
        <Card
          key={categoryItem.id}
          onClick={() => handleNavigateToListingPage(categoryItem, "category")}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
            <span className="font-bold">{categoryItem.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Section;
