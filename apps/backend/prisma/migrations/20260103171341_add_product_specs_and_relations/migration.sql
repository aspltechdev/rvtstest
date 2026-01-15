-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "certifications" TEXT[],
ADD COLUMN     "material" TEXT,
ADD COLUMN     "videoUrl" TEXT;

-- CreateTable
CREATE TABLE "_RelatedProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RelatedProducts_AB_unique" ON "_RelatedProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_RelatedProducts_B_index" ON "_RelatedProducts"("B");

-- AddForeignKey
ALTER TABLE "_RelatedProducts" ADD CONSTRAINT "_RelatedProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedProducts" ADD CONSTRAINT "_RelatedProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
