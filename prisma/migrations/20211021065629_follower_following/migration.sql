-- CreateTable
CREATE TABLE "_FollweRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FollweRelation_AB_unique" ON "_FollweRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_FollweRelation_B_index" ON "_FollweRelation"("B");

-- AddForeignKey
ALTER TABLE "_FollweRelation" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FollweRelation" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
